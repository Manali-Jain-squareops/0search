import Queue from 'bull';
import config from 'config';
import {
  FETCH_LATEST_BLOCKS_QUEUE
} from './constants';

// redis url
const redisURL = config.get('redis_url');

FETCH_LATEST_BLOCKS_QUEUE;

// block-fetcher-worker queues
const fetchLatestBlocksQueue = new Queue(FETCH_LATEST_BLOCKS_QUEUE, redisURL);

export { fetchLatestBlocksQueue };
