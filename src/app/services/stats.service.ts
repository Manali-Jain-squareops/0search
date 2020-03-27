import Stats from '../../entities/stats.entity';
import Connector from '../../lib/0chain-connector';
import config from 'config';

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

  /**
   * @module StatsService
   * @function getNetworkDetails To fetch current chain stats
   * @returns {Object} Object current stats of chain
   */
  static async getNetworkDetails() {
    const blockchainConfig = config.get('blockchainConfig');
    const connector = new Connector(blockchainConfig);
    return {
      miners: blockchainConfig['miners'],
      sharders: blockchainConfig['sharders'],
      blobbers: connector.getBlobbersFromSharders()
    };
  }
}
