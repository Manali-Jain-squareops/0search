import Stats from '../entities/stats.entity';

import { IStatsData } from '../interfaces'

import logger from '../lib/logger'

class StatsService {

  update = async (blockHash, stats: IStatsData, opts) => {
    try {
      stats.block_hash = blockHash
      await Stats.updateOne({}, { $set: stats }, { upsert: true, ...opts });
      logger.info(`Stats data Stored successfully`);

    } catch (error) {
      logger.error(`Error in store stats data, ${error}`);
      throw new Error(`Error in store stats data`)
    }
  }
}

export const statsService = new StatsService()
