import express from 'express'
import StatsController from '../controllers/stats.controller'

/**
 * @function initStatsRoutes To initialize '/stats' routes
 * @returns {Router} Returns stats router
 */
const initStatsRoutes = () => {
  const StatsRouter = express.Router()

  StatsRouter.get('/', StatsController.getCurrentStats)
  StatsRouter.get('/network-details', StatsController.getNetworkDetails)
  return StatsRouter
}

export default initStatsRoutes
