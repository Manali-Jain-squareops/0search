import express from 'express'

import BlockController from '../controllers/blocks.controller'

function initStatRoutes () {
  const StatRouter = express.Router()

  StatRouter.get('/recent', BlockController.recent)
  StatRouter.get('/latest', BlockController.latest)

  return StatRouter
}

export default initStatRoutes
