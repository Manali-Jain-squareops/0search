import 'reflect-metadata'
import logger from './lib/logger'
import { connect as mongoConnect, getMongoConnection, mongoose } from './lib/mongoose'

import config from 'config'

import Connector from './ledger-sync/connector'
import Fetcher from './ledger-sync/fetcher'

require("babel-core/register");
require("babel-polyfill");

// Handle with signal

const blockchainConfig = config.get('blockchainConfig')

const initLedgerSync = async () => {
  try {
    await mongoConnect()
    await getMongoConnection()
    const connector = new Connector(blockchainConfig)
    const fetcher = new Fetcher(connector)
    fetcher.start()
  }
  catch(error) {
    logger.error(`Error in initialising ledger-sync:- ${error}`)
  }
}

initLedgerSync()
