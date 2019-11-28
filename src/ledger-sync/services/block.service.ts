import Block from '../../entities/block.entity';

import { TransactionService } from './index'

import { mongoose } from "../../lib/mongoose";
import { IBlockData } from '../../interfaces'

import logger from '../../lib/logger'

class BlockService {

  add = async (requestData: IBlockData) => {

    const { hash, round, transactions } = requestData

    const session = await mongoose.startSession()
    await session.startTransaction();
    try {
      const opts = { session, returnOriginal: false };
      await Block.create([requestData], opts);

      const transactionSrv = new TransactionService()
      await transactionSrv.add(hash, transactions, opts);

      await session.commitTransaction();
      await session.endSession();

      logger.info(
        `Block data store successfully, blockNumber: ${round}`
      );

      return {
        status: 200,
        response: {
          blockHash: hash.toString(),
        },
      };
    } catch (error) {
      await session.abortTransaction();
      await session.endSession();
      logger.error(`Error in store block : ${error}`);
    }
  }
}

export default new BlockService()