import { fetchMissingBlocksQueue } from '../queues';
import of from 'await-of';
import { blockService } from '../../services/block.service';
import Connector from '../../lib/0chain-connector';
import logger from '../../lib/logger';
import { FETCH_MISSING_BLOCKS_PROCESS } from '../constants';
import Block from '../../entities/block.entity';
import config from 'config'
import Fetcher from '../../ledger-sync/fetcher';

export const pollMissingBlocks = (connector: Connector) => {
  fetchMissingBlocksQueue.process(FETCH_MISSING_BLOCKS_PROCESS, async (job: any, jobDone: any) => {

    const fetcher = new Fetcher(connector);
    let latestBlockInDB = await fetcher.getLatestBlockNumInDb();
    let blockRound = latestBlockInDB;
    let scanCount = config.get('scanner.scanLimit');

    logger.info('Fetching missing blocks ===>');

    while (scanCount) {
      if (!(await checkBlockPresentInDB(blockRound))) {
        logger.info(`Fetching block details for block round: ${blockRound}`);
        const [blockDetails, err] = await of(connector.getBlockDataByRound(blockRound));
        try {
          await blockService.add(blockDetails);
        } catch (error) {
          continue
        }
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
