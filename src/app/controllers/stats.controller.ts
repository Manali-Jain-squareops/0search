import Responder from '../../lib/expressResponder';
import { StatsService } from '../services/stats.service';

/**
 * This class provide controllers to fetch details regarding Chain Stats.
 *
 * @public
 * @class StatsController
 */
class StatsController {
  /**
   * @module StatsController
   * @function getCurrentStats To fetch current stats if chain
   * @param {Object} req Express request object
   * @param {Object} res Express response object
   * @returns {undefined} Sends response with chain stats
   */
  static async getCurrentStats(req, res) {
    const stats = await StatsService.getCurrentStats();
    return Responder.success(res, stats);
  }

  /**
   * @module StatsController
   * @function getNetworkDetails To fetch current stats if chain
   * @param {Object} req Express request object
   * @param {Object} res Express response object
   * @returns {undefined} Sends response with chain stats
   */
  static async getNetworkDetails(req, res) {
    const networkDetails = await StatsService.getNetworkDetails();
    return Responder.success(res, networkDetails);
  }
}

export default StatsController;
