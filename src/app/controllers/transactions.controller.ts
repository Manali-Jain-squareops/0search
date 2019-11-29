import of from 'await-of';
import Responder from '../../lib/expressResponder';
import { Pagination } from '../../utils/pagination';
import { validateQuery } from '../../utils/validateQuery';
import { TransactionService } from '../services/transaction.service';

const SEARCH_TRANSACTIONS_SUPPORTED_QUERY_PARAMS = [
  'hash',
  'block_hash',
  'from',
  'to'
];

/**
 * This class provide controllers to fetch details regarding transactions.
 *
 * @public
 * @class TransactionController
 */
class TransactionController {
  /**
   * @module TransactionController
   * @function getTransaction To fetch information of transaction via its hash
   * @param {Object} req Express request object
   * @param {Object} res Express response object
   * @returns {undefined} Sends response with details of transaction
   */
  static async getTransaction(req, res) {
    const transaction = await TransactionService.getTransaction(req.params.hash);
    if (!transaction) {
      return Responder.operationFailed(res, {
        message: `Unable to get transaction of hash ${req.params.hash}`
      });
    }

    return Responder.success(res, transaction);
  }

  /**
   * @module TransactionController
   * @function searchTransaction To search transactions
   * @param {Object} req Express request object
   * @param {Object} res Express response object
   * @returns {undefined} Sends paginated response with details of transactions
   */
  static async searchTransaction(req, res) {
    const [sanitizedQuery, error] = await of(validateQuery(req.query, SEARCH_TRANSACTIONS_SUPPORTED_QUERY_PARAMS));
    if (error) {
      return Responder.operationFailed(res, error.message);
    }

    const [params, paginationError] = await of(Pagination.getOffsetAndLimit(req.query.page, req.query.size));
    if (paginationError) {
      return Responder.operationFailed(res, paginationError.message);
    }

    const { transactions, count } = await TransactionService.searchTransactions({
      query: sanitizedQuery,
      skip: params.skip,
      limit: params.limit
    });

    const metadata = Pagination.preparePaginationMetaData(req.query.page, req.query.size, count);
    return Responder.success(res, { metadata, content: transactions });
  }
}

export default TransactionController;
