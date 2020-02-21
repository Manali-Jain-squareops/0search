import of from 'await-of';
import logger from '../lib/logger';
import { blockService } from '../services';
import Block from '../entities/block.entity';
import Connector from '../lib/0chain-connector';
import { checkBlockPresentInDB } from '../worker/processors/pollMissingBlocks'

export default class Fetcher {
  private connector: Connector;

  constructor(connector) {
    this.connector = connector;
  }

  async start() {
    let latestBlockInChain = await this.connector.getBlockNumInChain();
    let latestBlockInDb = await this.getLatestBlockNumInDb();

    while (latestBlockInDb <= latestBlockInChain) {
      const [data, err] = await of(this.connector.getBlockDataByRound(latestBlockInChain));
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
      latestBlockInDb = await this.getLatestBlockNumInDb();
      latestBlockInChain = await this.connector.getBlockNumInChain();
    }
  }

  async getLatestBlockNumInDb(): Promise<number> {
    const [block, err] = await of(Block.findOne().sort('-round'));
    const currentBlockInDb = block && block.round != undefined ? block.round : 1;
    return currentBlockInDb;
  }
}
