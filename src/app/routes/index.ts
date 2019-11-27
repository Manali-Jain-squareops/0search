import initBlockRoutes from './blocks.routes'
import initStatRoutes from './stats.routes'
import initTransactionRoutes from './transactions.routes'

function initRoutes (app) {
  app.use('/blocks', initBlockRoutes())
  app.use('/stats', initStatRoutes())
  app.use('/transactions', initTransactionRoutes())
}

export default initRoutes
