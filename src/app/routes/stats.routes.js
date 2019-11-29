import express from 'express'
import StatsController from '../controllers/stats.controller'

/**
 * @function initStatsRoutes To initialize '/stats' routes
 * @returns {Router} Returns stats router
 */
const initStatsRoutes = () => {
  const StatsRouter = express.Router()

  StatsRouter.get('/', StatsController.getCurrentStats)
  return StatsRouter
}

export default initStatsRoutes
