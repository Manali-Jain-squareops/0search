import express from 'express';
import TransactionController from '../controllers/transactions.controller';

/**
 * @function initTransactionsRoutes To initialize '/transactions' routes
 * @returns {Router} Returns transactions router
 */
const initTransactionsRoutes = () => {
  const TransactionsRouter = express.Router();

  TransactionsRouter.get('/search', TransactionController.searchTransaction);
  return TransactionsRouter;
};

export default initTransactionsRoutes;
