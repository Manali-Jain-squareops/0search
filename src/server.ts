import 'reflect-metadata'
import logger from './lib/logger'
import { connect as mongoConnect, getMongoConnection, mongoose } from './lib/mongoose'

import config from 'config'
import initExpress from './lib/express'
import * as http from 'http'

require("babel-core/register");
require("babel-polyfill");

function createServer (app) {
  return http.createServer(app).listen(config.get('port'))
}

const startServer = () => {
  const app = initExpress()

  const server = createServer(app)

  logger.info(`Server started on port ${config.get('port')}!`)
}

const initApp = async () => {
  try {
    await mongoConnect()
    await getMongoConnection()
    await startServer()
  }
  catch(error) {
    logger.error(`Error in initialising App:- ${error}`)
  }
}

initApp()
