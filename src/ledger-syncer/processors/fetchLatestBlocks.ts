import { fetchLatestBlocksQueue } from '../queues';
import of from 'await-of';
import { blockService } from '../../services/block.service';
import Connector from '../../lib/0chain-connector';
import logger from '../../lib/logger';
import { FETCH_LATEST_BLOCKS_PROCESS } from '../constants';
import Block from '../../entities/block.entity';

export const pollLatestBlocks = (connector: Connector) => {
  fetchLatestBlocksQueue.process(FETCH_LATEST_BLOCKS_PROCESS, async (job: any, jobDone: any) => {

    let latestBlockInDb = await getLatestBlockNumInDb();
    logger.info('Fetching latest blocks ===>');
    let latestBlockInChain = await connector.getBlockNumInChain();

    while (latestBlockInDb <= latestBlockInChain) {
      const [data, err] = await of(connector.getBlockDataByRound(latestBlockInChain));
      if (err) {
        logger.error('Error fetching data from blockchain', err);
        continue
      }
      // Update in database
      if (!(await checkBlockPresentInDB(latestBlockInChain))) {
        const [response, error] = await of(blockService.add(data));
        if (error) {
          logger.error('Error fetching data from blockchain', error);
          continue
        }
      }
      latestBlockInDb = await getLatestBlockNumInDb();
      latestBlockInChain = await connector.getBlockNumInChain();
    }
    return jobDone();
  });
};

export const getLatestBlockNumInDb = async () => {
  const [block, err] = await of(Block.findOne().sort('-round'));
  const currentBlockInDb = block && block.round != undefined ? block.round : 1;
  return currentBlockInDb;
}

export const checkBlockPresentInDB = async (blockRound) => {
  return await Block.findOne({ 'round': blockRound });
}
