import 'reflect-metadata';
import logger from './lib/logger';
import { Scanner } from './scanner/';
import { connect as mongoConnect } from './lib/mongoose';

require('babel-core/register');
require('babel-polyfill');

const initScanner = async () => {
  try {
    await mongoConnect();
    const scanner = new Scanner();
    scanner.run();
  } catch (error) {
    logger.error('Error in starting scanner', error);
  }
};

initScanner();
