import Stats from '../../entities/stats.entity';

import { IStatsData } from '../../interfaces'

import logger from '../../lib/logger'

class StatsService {

  add = async (stats: IStatsData) => {
    try {
      await Stats.updateOne({}, { $set: stats }, { upsert: true });

      logger.info(`Stats data Stored successfully`);

    } catch (error) {
      logger.error(`Error in store stats data, ${error}`);
    }
  }
}

export const statsService = new StatsService()
