import express from 'express';
import BlockController from '../controllers/blocks.controller';

/**
 * @function initBlockRoutes To initialize '/block' routes
 * @returns {Router} Returns block router
 */
const initBlockRoutes = () => {
  const BlockRouter = express.Router();

  BlockRouter.get('/', BlockController.getBlock);
  BlockRouter.get('/latest', BlockController.latest);

  return BlockRouter;
};

export default initBlockRoutes;
