import Block from '../entities/block.entity';
import Transaction from '../entities/transaction.entity';
import { mongoose } from "../../lib/mongoose";
import { IBlockRequestData } from '../interfaces'

import logger from '../../lib/logger'

export class BlockService {

  add = async (requestData: IBlockRequestData) => {

    const { hash, round } = requestData

    const session = await mongoose.startSession()
    await session.startTransaction();
    try {
      console.log(JSON.stringify(requestData))
      const opts = { session, returnOriginal: false };
      await Block.create([requestData], opts);

      await Transaction.create(requestData.transactions, opts);

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
