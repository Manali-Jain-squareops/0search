import { fetchTransactionDetailsQueue, fetchAndVerifyFileDetailsQueue, fetchIncompleteTransactions } from './queues';
import config from 'config';
import {
  FETCH_INCOMPLETE_TRANSACTIONS_PROCESS,
  FETCH_TRANSACTION_DETAILS_PROCESS,
  FETCH_AND_VERIFY_FILE_DETAILS_PROCESS
} from './constants';

const NUMBER_OF_REATTEMPTS = config.get('worker.reattempts');
const BACK_OFF_DELAY = config.get('worker.backoffDelay');
const POLLING_DURATION = config.get('worker.pollingDuration');

// adds job to fetch transaction details having given txn hash
export const fetchIncompleteTransactionsJob = () => {
  fetchIncompleteTransactions.add(
    FETCH_INCOMPLETE_TRANSACTIONS_PROCESS,
    {},
    {
      jobId: 'fetch-incomplete-transactions',
      repeat: {
        every: POLLING_DURATION
      },
      removeOnComplete: true
    }
  );
};

// adds job to fetch transaction details having given txn hash
export const addFetchTransactionDetailsJob = (transactionHash: string) => {
  fetchTransactionDetailsQueue.add(
    FETCH_TRANSACTION_DETAILS_PROCESS,
    { transactionHash },
    {
      jobId: transactionHash,
      attempts: NUMBER_OF_REATTEMPTS,
      backoff: {
        type: 'fixed',
        delay: BACK_OFF_DELAY
      },
      removeOnComplete: true
    }
  );
};

// adds job to fetch and verify file details having given file hash
export const addFetchAndVerifyFileDetailsJob = fileMetadata => {
  fetchAndVerifyFileDetailsQueue.add(
    FETCH_AND_VERIFY_FILE_DETAILS_PROCESS,
    { fileMetadata },
    {
      jobId: fileMetadata.actual_file_hash,
      attempts: NUMBER_OF_REATTEMPTS,
      backoff: {
        type: 'fixed',
        delay: BACK_OFF_DELAY
      },
      removeOnComplete: true
    }
  );
};
