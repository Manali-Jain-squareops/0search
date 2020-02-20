import Queue from 'bull';
import config from 'config';
import {
  FETCH_MISSING_BLOCKS_QUEUE
} from './constants';

// redis url
const redisURL = config.get('redis_url');

FETCH_MISSING_BLOCKS_QUEUE;

// block-fetcher-worker queues
const fetchMissingBlocksQueue = new Queue(FETCH_MISSING_BLOCKS_QUEUE, redisURL);

export { fetchMissingBlocksQueue };
