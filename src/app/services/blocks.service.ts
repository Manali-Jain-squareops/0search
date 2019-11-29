import Block from '../../entities/block.entity';

/**
 * This class provide service to perform operations regarding chain blocks
 *
 * @public
 * @class BlockService
 */
export class BlockService {
  /**
   * @module BlockService
   * @function getLatestBlocks To fetch list of latest blocks
   * @param {Object} skip: Number of records to skip; limit: Number of records to return
   * @returns {Object} blocks: Array<Object>; Number: total number of blocks
   */
  static async getLatestBlocks({ skip, limit }) {
    const blocks = await Block.find()
      .sort({ round: -1 })
      .skip(skip)
      .limit(limit);

    const count = await Block.find().count();
    return { blocks, count };
  }

  /**
   * @module BlockService
   * @function getLatestBlock To fetch latest block
   * @returns {Object} block: Object
   */
  static async getLatestBlock() {
    const block = await Block.find()
      .sort({ round: -1 })
      .limit(1);

    return block;
  }

  /**
   * @module BlockService
   * @function getBlock To fetch block that matches provided query
   * @param {Object} query: Query to be applied to search block
   * @returns {Object} block: Object
   */
  static async getBlock(query) {
    return Block.find(query).lean();
  }

  /**
   * @module BlockService
   * @function searchBlocks To fetch list of blocks that matches provided query
   * @param {Object} query: Query to be applied to search blocks; skip: Number of records to skip; limit: Number of records to return
   * @returns {Object} blocks: Array<Object>; count: Number total number of blocks
   */
  static async searchBlocks({ query, skip, limit }) {
    const blocks = await Block.find(query)
      .lean()
      .sort({ round: -1 })
      .skip(skip)
      .limit(limit);

    const count = await Block.find(query).count();
    return { blocks, count };
  }
}
