import 'reflect-metadata';
import _ from 'lodash';
import config from 'config';
import * as http from 'http';
import logger from './lib/logger';
import initExpress from './lib/express';
import { connect as mongoConnect, getMongoConnection } from './lib/mongoose';

require('babel-core/register');
require('babel-polyfill');

function createServer(app) {
  return http.createServer(app).listen(config.get('port'));
}

const startServer = () => {
  const app = initExpress();
  createServer(app);

  logger.info(`Server started on port ${config.get('port')}!`);
};

const initApp = async () => {
  try {
    await mongoConnect();
    await getMongoConnection();
    await startServer();
  } catch (error) {
    logger.error('Error in initializing App', error);
  }
};

initApp();
