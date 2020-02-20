import logger from '../lib/logger';
import { initProcessors } from './processors';
import { scanMissingBlocksJob } from './jobs';

export class Scanner {
  public run() {
    logger.info('Starting Block details fetching');

    initProcessors();
    scanMissingBlocksJob();
  }
}
