import Block from '../entities/block.entity';
import logger from '../lib/logger';
import { IBlockData } from '../interfaces';
import { mongoose } from '../lib/mongoose';
import { transactionService } from './index';
import { statsService } from './stats.service';

class BlockService {
  add = async (requestData: IBlockData) => {
    const { hash, round, transactions, chain_stats } = requestData;

    const session = await mongoose.startSession();
    await session.startTransaction();
    try {
      const opts = { session, returnOriginal: false };
      requestData.num_txns = requestData.transactions.length;

      logger.info(`Storing Block data, blockNumber: ${round}`);
      await Block.create([requestData], opts);

      logger.info(`Storing transaction data`);
      await transactionService.add(hash, transactions, opts);

      logger.info(`Updating chain data`);
      await statsService.update(hash, chain_stats, opts);

      await session.commitTransaction();
      await session.endSession();

      logger.info(`Block data store successfully, blockNumber: ${round}`);

      return {
        status: 200,
        response: {
          blockHash: hash.toString()
        }
      };
    } catch (error) {
      await session.abortTransaction();
      await session.endSession();
      logger.error(`Error in storing block, blockNumber: ${round}, ${error}`);
    }
  };
}

export const blockService = new BlockService();
