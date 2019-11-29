import Stats from '../../entities/stats.entity';

/**
 * This class provide service to perform operations regarding chain stats
 *
 * @public
 * @class StatsService
 */
export class StatsService {
  /**
   * @module StatsService
   * @function getCurrentStats To fetch current chain stats
   * @returns {Object} Object current stats of chain
   */
  static async getCurrentStats() {
    return Stats.findOne();
  }
}
