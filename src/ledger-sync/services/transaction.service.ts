import Transaction from '../../entities/transaction.entity';
import { ITransactionData } from '../../interfaces';

import logger from '../../lib/logger';

class TransactionService {
  add = async (block_hash: string, transactions: ITransactionData[], opts) => {
    try {
      transactions.map(txn => {
        return (txn.block_hash = block_hash);
      });

      await Transaction.create(transactions, opts);

      logger.info(`Transaction Stored successfully, block hash: ${block_hash}`);
    } catch (error) {
      logger.error(`Error in store transactions for block hash : ${block_hash}, ${error}`);
    }
  };
}

export const transactionService = new TransactionService();
