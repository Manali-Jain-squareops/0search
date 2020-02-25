import logger from '../lib/logger';
import { initProcessors } from './processors';
import { fetchLatestBlocksJob } from './jobs';

export class ledgerSync {
  public run() {
    logger.info('Starting Block details fetching');

    initProcessors();
    fetchLatestBlocksJob();
  }
}
