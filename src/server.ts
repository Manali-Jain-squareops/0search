import * as bodyParser from 'body-parser'
import 'reflect-metadata'
import logger from './lib/logger'
import { connect as mongoConnect, getMongoConnection, mongoose } from './lib/mongoose'

import config from 'config'
import express from 'express'
import cors from 'cors'

require("babel-core/register");
require("babel-polyfill");

const app = express()

const startServer = () => {
  app.use(cors())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(express.json());

  app.listen(config.get('port'), () => {
    logger.info(`Server started on port ${config.get('port')}!`)
  })
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

export default app
