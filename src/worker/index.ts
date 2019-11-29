import logger from '../lib/logger';
import { initProcessors } from './processors';
import { fetchIncompleteTransactionsJob } from './jobs';

export class Worker {
  public run() {
    logger.info('Starting Transaction details fetching');

    initProcessors();
    fetchIncompleteTransactionsJob();
  }
}
