import Queue from 'bull';
import config from 'config'

// redis url
const redisURL = config.get('redis_url');

// block-fetcher-worker queues
const fetchIncompleteTransactions = new Queue(`fetch-incomplete-transaction-queue`, redisURL)
const fetchTransactionDetailsQueue = new Queue(`fetch-transaction-details-queue`, redisURL);
const fetchAndVerifyFileDetailsQueue = new Queue(`verify-and-add-file-queue`, redisURL);

export { fetchTransactionDetailsQueue, fetchAndVerifyFileDetailsQueue, fetchIncompleteTransactions };
