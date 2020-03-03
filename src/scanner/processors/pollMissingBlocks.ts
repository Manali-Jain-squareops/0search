import { fetchMissingBlocksQueue } from '../queues';
import of from 'await-of';
import { blockService } from '../../services/block.service';
import Connector from '../../lib/0chain-connector';
import logger from '../../lib/logger';
import { FETCH_MISSING_BLOCKS_PROCESS } from '../constants';
import Block from '../../entities/block.entity';
import config from 'config'
import { getLatestBlockNumInDb } from '../../ledger-syncer/processors/fetchLatestBlocks'

export const pollMissingBlocks = (connector: Connector) => {
  fetchMissingBlocksQueue.process(FETCH_MISSING_BLOCKS_PROCESS, async (job: any, jobDone: any) => {

    let latestBlockInDB = await getLatestBlockNumInDb();
    let blockRound = latestBlockInDB;
    let scanCount = config.get('scanner.scanLimit');

    logger.info('Fetching missing blocks ===>');

    while (scanCount) {
      if (!(await checkBlockPresentInDB(blockRound))) {
        if (blockRound === 1){
          scanCount = 0
          continue
        }
        logger.info(`Fetching block details for block round: ${blockRound}`);
        const [blockDetails, err] = await of(connector.getBlockDataByRound(blockRound));
        if (err) {
          logger.info(`Error getting block ${blockRound} from the database`)
          continue
        }
        const [response, error] = await of(blockService.add(blockDetails));
        if (error) {
          logger.info(`Error adding block ${blockRound} in the database`)
          continue
        }
        logger.info(`Current Scan Count ===> ${scanCount}`);
        scanCount -= 1
      }
      blockRound -= 1
    }
    return jobDone();
  });
};

export const checkBlockPresentInDB = async (blockRound) => {
  return await Block.findOne({ 'round': blockRound });
}
