import cors from 'cors';
import morgan from 'morgan';
import express from 'express';
import * as bodyParser from 'body-parser';
import methodOverride from 'method-override';

import logger from './logger';
import initRoutes from './../app/routes';
import Responder from './expressResponder';

const app = express();

function initMiddleware() {
  app.use(methodOverride());

  app.use(cors());

  app.use(bodyParser.json({ limit: '50mb' }));

  app.use(morgan('combined', logger.stream));
}

function initPingURL() {
  app.get('/_ping', (req, res) => {
    Responder.success(res, { result: 'Ping Received!!!' });
  });
}

function catchNotFound() {
  app.use(Responder.notFound);
}

function catchErrorRoutes() {
  app.use((err, req, res, next) => {
    if (!err) return next();
    return Responder.operationFailed(res, err);
  });
}

function initExpress() {
  // Initialize Middlewares
  initMiddleware();

  // Initialize Ping URL
  initPingURL();

  // Initialize API Routes
  initRoutes(app);

  // Initialize Not Found Route
  catchNotFound();

  // Initialize Error Routes
  catchErrorRoutes();

  return app;
}

export default initExpress;
