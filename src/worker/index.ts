import logger from '../lib/logger';
import { initProcessors } from './processors';
import { fetchMissingBlocksJob } from './jobs';

export class Worker {
  public run() {
    logger.info('Starting Block details fetching');

    initProcessors();
    fetchMissingBlocksJob();
  }
}
