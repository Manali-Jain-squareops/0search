import initBlockRoutes from './block.routes';
import initBlocksRoutes from './blocks.routes';
import initDocsRoutes from './docs.routes';
import initStatsRoutes from './stats.routes';
import initTransactionRoutes from './transaction.routes';
import initTransactionsRoutes from './transactions.routes';

/**
 * @function initRoutes To initialize routes
 * @returns {undefined} Adds routes in express application
 */
const initRoutes = app => {
  app.use('/block', initBlockRoutes());
  app.use('/blocks', initBlocksRoutes());
  app.use('/docs', initDocsRoutes());
  app.use('/stats', initStatsRoutes());
  app.use('/transaction', initTransactionRoutes());
  app.use('/transactions', initTransactionsRoutes());
};

export default initRoutes;
