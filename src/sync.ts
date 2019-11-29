import 'reflect-metadata';
import config from 'config';
import logger from './lib/logger';
import Fetcher from './ledger-sync/fetcher';
import Connector from './lib/0chain-connector';
import { connect as mongoConnect } from './lib/mongoose';

require('babel-core/register');
require('babel-polyfill');

const blockchainConfig = config.get('blockchainConfig');

const initLedgerSync = async () => {
  try {
    await mongoConnect();
    const connector = new Connector(blockchainConfig);
    const fetcher = new Fetcher(connector);
    fetcher.start();
  } catch (error) {
    logger.error(`Error in initialising ledger-sync`, error);
  }
};

initLedgerSync();
