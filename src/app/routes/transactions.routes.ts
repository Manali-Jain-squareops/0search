import express from 'express'

import TransactionController from '../controllers/transactions.controller'

function initTransactionRoutes () {
  const TransactionRouter = express.Router()

  TransactionRouter.get('/', TransactionController.list)
  TransactionRouter.get('/:transactionId', TransactionController.get)

  return TransactionRouter
}

export default initTransactionRoutes
