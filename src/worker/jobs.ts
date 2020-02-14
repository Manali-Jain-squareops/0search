import { fetchMissingBlocksQueue } from './queues';
import config from 'config';
import {
  FETCH_MISSING_BLOCKS_PROCESS
} from './constants';

const POLLING_DURATION = config.get('worker.pollingDuration');

// adds job to fetch missing blocks
export const fetchMissingBlocksJob = () => {
  fetchMissingBlocksQueue.add(
    FETCH_MISSING_BLOCKS_PROCESS,
    {},
    {
      jobId: 'fetch-missing-blocks',
      repeat: {
        every: POLLING_DURATION
      },
      removeOnComplete: true
    }
  );
};
