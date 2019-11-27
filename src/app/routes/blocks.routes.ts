import express from 'express'

import BlockController from '../controllers/blocks.controller'

function initBlockRoutes () {
  const BlockRouter = express.Router()

  BlockRouter.get('/', BlockController.list)
  BlockRouter.get('/:blockId', BlockController.get)

  return BlockRouter
}

export default initBlockRoutes
