import _ from 'lodash';
import of from 'await-of';
import logger from '../../lib/logger';
import Responder from '../../lib/expressResponder';
import { BlockService } from '../services/blocks.service';
import { Pagination } from '../../utils/pagination';
import { TransactionService } from '../services/transaction.service';
import { validateQuery } from '../../utils/validateQuery';

const GET_BLOCK_SUPPORTED_QUERY_PARAMS = ['hash', 'round'];

const SEARCH_BLOCK_SUPPORTED_QUERY_PARAMS = ['hash', 'version', 'round', 'miner_id', 'chain_id'];

/**
 * This class provide controllers to fetch details regarding blocks.
 *
 * @public
 * @class BlockController
 */
class BlockController {
  /**
   * @module BlockController
   * @function latest To fetch information of latest block
   * @param {Object} req Express request object
   * @param {Object} res Express response object
   * @returns {undefined} Sends response with details of latest block
   */
  static async latest(req, res) {
    const [blocks, error] = await of(BlockService.getLatestBlock());
    if (error) {
      logger.error('Unable to fetch latest block', error);
      return Responder.operationFailed(res, 'Unable to latest block');
    }

    const block = blocks && blocks[0] ? blocks[0] : {};
    return Responder.success(res, block);
  }

  /**
   * @module BlockController
   * @function getLatestBlocks To fetch list of latest blocks
   * @param {Object} req Express request object
   * @param {Object} res Express response object
   * @returns {undefined} Sends paginated list of blocks as response
   */
  static async getLatestBlocks(req, res) {
    const [params, paginationError] = await of(Pagination.getOffsetAndLimit(req.query.page, req.query.size));
    if (paginationError) {
      logger.error('Invalid pagination params', paginationError);
      return Responder.operationFailed(res, paginationError.message);
    }

    const [latestBlocks, error] = await of(BlockService.getLatestBlocks({ skip: params.skip, limit: params.limit }));
    if (error) {
      logger.error('Unable to latest block', error);
      return Responder.operationFailed(res, 'Unable to latest block');
    }

    const metadata = Pagination.preparePaginationMetaData(req.query.page, req.query.size, latestBlocks.count);
    const responseData = { metadata, content: latestBlocks.blocks };

    return Responder.success(res, responseData);
  }

  /**
   * @module BlockController
   * @function getBlock To fetch information of block via its hash or round
   * @param {Object} req Express request object
   * @param {Object} res Express response object
   * @returns {undefined} Sends response with details of block and paginated list of transactions in that block
   */
  static async getBlock(req, res) {
    const [sanitizedQuery, error] = await of(validateQuery(req.query, GET_BLOCK_SUPPORTED_QUERY_PARAMS));
    if (error) {
      logger.error('Error occurred', error);
      return Responder.operationFailed(res, error.message);
    }

    const blocks = await BlockService.getBlock(sanitizedQuery);
    if (!blocks || !blocks[0]) {
      return Responder.operationFailed(res, { message: 'No matching blocks found' });
    }

    const [params, paginationError] = await of(Pagination.getOffsetAndLimit(req.query.page, req.query.size));
    if (paginationError) {
      logger.error('Pagination param error', paginationError);
      return Responder.operationFailed(res, paginationError.message);
    }

    const { transactions, count } = await TransactionService.getBlockTransaction({
      blockHash: blocks[0].hash,
      skip: params.skip,
      limit: params.limit
    });

    const metadata = Pagination.preparePaginationMetaData(req.query.page, req.query.size, count);
    const responseData = {
      ...blocks[0],
      transactions: { metadata, content: transactions }
    };

    return Responder.success(res, responseData);
  }

  /**
   * @module BlockController
   * @function searchBlocks To search blocks
   * @param {Object} req Express request object
   * @param {Object} res Express response object
   * @returns {undefined} Sends paginated response with details of blocks that match provided search criteria
   */
  static async searchBlocks(req, res) {
    const [sanitizedQuery, error] = await of(validateQuery(req.query, SEARCH_BLOCK_SUPPORTED_QUERY_PARAMS));
    if (error) {
      logger.error('Error occurred', error);
      return Responder.operationFailed(res, error.message);
    }

    const [params, paginationError] = await of(Pagination.getOffsetAndLimit(req.query.page, req.query.size));
    if (paginationError) {
      logger.error('Invalid pagination params', paginationError);
      return Responder.operationFailed(res, paginationError.message);
    }

    const { blocks, count } = await BlockService.searchBlocks({
      query: sanitizedQuery,
      skip: params.skip,
      limit: params.limit
    });

    const metadata = Pagination.preparePaginationMetaData(req.query.page, req.query.size, count);
    return Responder.success(res, { metadata, content: blocks });
  }
}

export default BlockController;
