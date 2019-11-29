import Queue from 'bull';
import config from 'config';
import {
  FETCH_INCOMPLETE_TRANSACTIONS_QUEUE,
  FETCH_TRANSACTION_DETAILS_QUEUE,
  VERIFY_AND_ADD_FILE_QUEUE
} from './constants';

// redis url
const redisURL = config.get('redis_url');

FETCH_INCOMPLETE_TRANSACTIONS_QUEUE;
FETCH_TRANSACTION_DETAILS_QUEUE;
VERIFY_AND_ADD_FILE_QUEUE;

// block-fetcher-worker queues
const fetchIncompleteTransactions = new Queue(FETCH_INCOMPLETE_TRANSACTIONS_QUEUE, redisURL);
const fetchTransactionDetailsQueue = new Queue(FETCH_TRANSACTION_DETAILS_QUEUE, redisURL);
const fetchAndVerifyFileDetailsQueue = new Queue(VERIFY_AND_ADD_FILE_QUEUE, redisURL);

export { fetchTransactionDetailsQueue, fetchAndVerifyFileDetailsQueue, fetchIncompleteTransactions };
