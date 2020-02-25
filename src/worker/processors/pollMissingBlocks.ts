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
    logger.info('Fetching missing blocks ===>');

    let latestBlockInDB = await getLatestBlockNumInDb();
    let latestBlockInChain = await connector.getBlockNumInChain();
    let blockRound = config.get('worker.startFromBlock');

    while (latestBlockInDB < latestBlockInChain) {
      if (!(await checkBlockPresentInDB(blockRound))) {
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
        logger.info(`Fetched block details for block: ${blockRound}`);
      }
      blockRound += 1
    }
    return jobDone();
  });
};

export const checkBlockPresentInDB = async (blockRound) => {
  return await Block.findOne({ 'round': blockRound });
}
