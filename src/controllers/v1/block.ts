import Block from '../../entities/block';
import Transaction from '../../entities/transaction';
import { mongoose } from "../../lib/mongoose";

import logger from '../../lib/logger'

interface IRequestData {
  version: string;
  creation_date: number;
  magic_block_hash: string;
  prev_hash: string;
  miner_id: string;
  round: number;
  round_random_seed: number;
  round_timeout_count: number;
  state_hash: string;
  hash: string;
  signature: string;
  chain_id: string;
  chain_weight: number;
  prev_verification_tickets: any;
  transactions: any;
  verification_tickets: any;
}

export class BlockController {

  add = async (requestData: IRequestData) => {

    const { hash, round } = requestData

    const session = await mongoose.startSession()
    session.startTransaction();
    try {
      console.log(JSON.stringify(requestData))
      const opts = { session, returnOriginal: false };
      await Block.create([requestData], opts);

      await Transaction.create(requestData.transactions, opts);

      await session.commitTransaction();
      session.endSession();

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
      session.endSession();
      logger.error(`Error in store block : ${error}`);
    }
  }
}
