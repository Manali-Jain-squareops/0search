import Block from '../entities/block.entity';

import { TransactionService } from '../../app/services'

import { mongoose } from "../../lib/mongoose";
import { IBlockData } from '../interfaces'

import logger from '../../lib/logger'

export class BlockService {

  add = async (requestData: IBlockData) => {

    const { hash, round, transactions } = requestData

    const session = await mongoose.startSession()
    await session.startTransaction();
    try {
      console.log(JSON.stringify(requestData))
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
