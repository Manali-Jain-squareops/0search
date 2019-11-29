import Boom from '@hapi/boom';
import logger from '../lib/logger';
import Stats from '../entities/stats.entity';
import { IStatsData } from '../interfaces';

class StatsService {
  update = async (blockHash, stats: IStatsData, opts) => {
    try {
      stats.block_hash = blockHash;
      await Stats.updateOne({}, { $set: stats }, { upsert: true, ...opts });
      logger.info(`Stats data Stored successfully`);
    } catch (error) {
      logger.error('Error in store stats data', error);
      throw Boom.badRequest(`Error in store stats data`);
    }
  };
}

export const statsService = new StatsService();
