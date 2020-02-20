import { fetchMissingBlocksQueue } from './queues';
import config from 'config';
import {
  FETCH_MISSING_BLOCKS_PROCESS
} from './constants';

const POLLING_DURATION = config.get('scanner.pollingDuration');

// adds job to fetch missing blocks
export const scanMissingBlocksJob = () => {
  fetchMissingBlocksQueue.add(
    FETCH_MISSING_BLOCKS_PROCESS,
    {},
    {
      jobId: 'scan-missing-blocks',
      repeat: {
        every: POLLING_DURATION
      },
      removeOnComplete: true
    }
  );
};
