import { fetchMissingBlocksQueue } from '../queues';
import of from 'await-of';
import { blockService } from '../../services/block.service';
import Connector from '../../lib/0chain-connector';
import logger from '../../lib/logger';
import { FETCH_MISSING_BLOCKS_PROCESS } from '../constants';
import Block from '../../entities/block.entity';
import Fetcher from '../../ledger-sync/fetcher';

export const pollMissingBlocks = (connector: Connector) => {
  fetchMissingBlocksQueue.process(FETCH_MISSING_BLOCKS_PROCESS, async (job: any, jobDone: any) => {
    logger.info('Fetching missing blocks ===>');

    const fetcher = new Fetcher(connector);
    let latestBlockInDB = await fetcher.getLatestBlockNumInDb();
    let blockRound = 2;

    while (blockRound <= latestBlockInDB) {

      if (!(await checkBlockPresentInDB(blockRound))) {

        logger.info(`Fetching block details for block round: ${blockRound}`);
        const [blockDetails, err] = await of(connector.getBlockDataByRound(blockRound));

        await blockService.add(blockDetails);

        if (err) {
          logger.error(`Error fetching blockDetails of ${blockRound} from sdk`, err);
          return jobDone(err);
        }
        logger.info(`Fetched block details for block: ${blockRound}`);
      }
      blockRound += 1
    }
    // latestBlockInDB = await fetcher.getLatestBlockNumInDb();
    return jobDone();
  });
};

export const checkBlockPresentInDB = async (blockRound) => {
  return await Block.findOne({ 'round': blockRound });
}
