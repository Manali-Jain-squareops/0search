import * as bodyParser from 'body-parser'
import 'reflect-metadata'

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
    console.log(`Server started on port ${config.get('port')}!`)
  })
}

const initApp = async () => {
  try {
    await startServer()
  }
  catch(error) {
    console.log(`Error in initialising App:- ${error}`)
  }
}

initApp()

export default app
