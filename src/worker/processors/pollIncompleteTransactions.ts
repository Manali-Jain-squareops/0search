import of from 'await-of';
import { fetchIncompleteTransactions } from '../queues';
import { transactionService } from '../../services/transaction.service';
import { addFetchTransactionDetailsJob } from '../jobs';
import logger from '../../lib/logger';
import { FETCH_INCOMPLETE_TRANSACTIONS_PROCESS } from '../constants';

export const pollIncompleteTransactions = () => {
  fetchIncompleteTransactions.process(FETCH_INCOMPLETE_TRANSACTIONS_PROCESS, async (job: any, jobDone: any) => {
    logger.info('Fetching incomplete transactions ===>');
    
    const [transactions, err] = await of(transactionService.getIncompleteTransactions());
    if (err) {
      logger.error('Error fetching incomplete transactions', err);
      return jobDone(err);
    }

    for (const txn of transactions) {
      addFetchTransactionDetailsJob(txn.hash);
    }

    logger.info(`Added ${transactions.length} jobs to fetch transaction details`);
    return jobDone();
  });
};
