import Boom from '@hapi/boom';
import logger from '../lib/logger';
import { mongoose } from '../lib/mongoose';
import Transaction from '../entities/transaction.entity';
import Confirmation from '../entities/confirmation.entity';
import { ITransactionData, IConfirmationData } from '../interfaces';

class TransactionService {
  add = async (block_hash: string, transactions: ITransactionData[], opts) => {
    try {
      transactions.map(txn => {
        txn.confirmation_fetched = false;
        return (txn.block_hash = block_hash);
      });

      await Transaction.create(transactions, opts);

      logger.info(`Transaction Stored successfully, block hash: ${block_hash}`);
    } catch (error) {
      logger.error(`Error in store transactions for block hash : ${block_hash}`, error);
      throw Boom.badRequest(`Error in store transactions for block hash : ${block_hash}`);
    }
  };

  addConfirmationDetails = async (txnHash: string, confirmations: IConfirmationData) => {
    const session = await mongoose.startSession();
    await session.startTransaction();
    const opts = { session, returnOriginal: false };
    try {
      await Confirmation.create([confirmations], opts);
      await Transaction.updateOne({ hash: txnHash }, { confirmation_fetched: true }, opts);

      logger.info(`Added confirmation details for txn: ${txnHash}`);
      await session.commitTransaction();
      await session.endSession();
    } catch (err) {
      await session.abortTransaction();
      await session.endSession();
      logger.error(`Error adding confirmation for txn: ${txnHash}`, err);
    }
  };

  getIncompleteTransactions = async () => {
    try {
      return Transaction.find({ confirmation_fetched: false });
    } catch (error) {
      logger.error(`Error fetching incomplete transactions`, error);
      throw Boom.badRequest(`Error fetching incomplete transactions`);
    }
  };
}

export const transactionService = new TransactionService();
