import 'reflect-metadata';
import logger from './lib/logger';
import { Worker } from './worker/';
import { connect as mongoConnect } from './lib/mongoose';

require('babel-core/register');
require('babel-polyfill');

const initWorker = async () => {
  try {
    await mongoConnect();
    const worker = new Worker();
    worker.run();
  } catch (error) {
    logger.error('Error in starting workers', error);
  }
};

initWorker();
