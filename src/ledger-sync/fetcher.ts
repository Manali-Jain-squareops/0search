import of from 'await-of';
import Boom from '@hapi/boom';
import logger from '../lib/logger';
import { blockService } from '../services';
import Block from '../entities/block.entity';
import Connector from '../lib/0chain-connector';

export default class Fetcher {
  private connector: Connector;

  constructor(connector) {
    this.connector = connector;
  }

  async start() {
    let latestBlockInChain = await this.connector.getBlockNumInChain();
    let latestBlockInDb = await this.getLatestBlockNumInDb();

    while (latestBlockInDb <= latestBlockInChain) {
      const [data, err] = await of(this.connector.getBlockDataByRound(latestBlockInDb + 1));
      if (err) {
        logger.error('Error fetching data from blockchain', err);
        throw Boom.badRequest('Error fetching data from blockchain');
      }
      // Update in database
      await blockService.add(data);

      latestBlockInDb = await this.getLatestBlockNumInDb();
    }
    latestBlockInChain = await this.connector.getBlockNumInChain();
  }

  async getLatestBlockNumInDb(): Promise<number> {
    const [block, err] = await of(Block.findOne().sort('-round'));

    if (err) {
      logger.error('Error fetching block from database', err);
      throw Boom.badRequest('Error fetching block from database');
    }

    const currentBlockInDb = block && block.round != undefined ? block.round : 1;
    return currentBlockInDb;
  }
}
