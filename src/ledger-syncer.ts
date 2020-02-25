import 'reflect-metadata';
import logger from './lib/logger';
import { ledgerSync } from './ledger-syncer/';
import { connect as mongoConnect } from './lib/mongoose';

require('babel-core/register');
require('babel-polyfill');

const initSyncer = async () => {
  try {
    await mongoConnect();
    const sync = new ledgerSync();
    sync.run();
  } catch (error) {
    logger.error('Error in starting scanner', error);
  }
};

initSyncer();
