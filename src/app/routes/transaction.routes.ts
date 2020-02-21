import express from 'express';
import TransactionController from '../controllers/transactions.controller';

/**
 * @function initTransactionRoutes To initialize '/transaction' routes
 * @returns {Router} Returns transaction router
 */
const initTransactionRoutes = () => {
  const TransactionRouter = express.Router();

  TransactionRouter.get('/:hash', TransactionController.getTransaction);
  TransactionRouter.post('/sign-transaction', TransactionController.signTransaction);
  return TransactionRouter;
};

export default initTransactionRoutes;
