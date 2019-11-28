import Block from '../../entities/block.entity';

import { transactionService, verificationTicketService } from './index'

import { mongoose } from "../../lib/mongoose";
import { IBlockData } from '../../interfaces'

import logger from '../../lib/logger'

class BlockService {

  add = async (requestData: IBlockData) => {

    const { hash, round, transactions, prev_verification_tickets, verification_tickets } = requestData

    const session = await mongoose.startSession()
    await session.startTransaction();
    try {
      const opts = { session, returnOriginal: false };
      logger.info(`Storing Block data, blockNumber: ${round}`);
      await Block.create([requestData], opts);

      logger.info(`Storing transaction data`);
      await transactionService.add(hash, transactions, opts);

      logger.info(`Storing verification tickets`);
      const tickets = prev_verification_tickets.concat(verification_tickets);
      await verificationTicketService.add(hash, tickets, opts);

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
      logger.error(`Error in store block, blockNumber: ${round}, ${error}`);
    }
  }
}

export const blockService = new BlockService()