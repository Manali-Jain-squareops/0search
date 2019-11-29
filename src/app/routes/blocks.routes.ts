import express from 'express';
import BlockController from '../controllers/blocks.controller';

/**
 * @function initBlocksRoutes To initialize '/blocks' routes
 * @returns {Router} Returns blocks router
 */
const initBlocksRoutes = () => {
  const BlocksRouter = express.Router();

  BlocksRouter.get('/', BlockController.getLatestBlocks);
  BlocksRouter.get('/search', BlockController.searchBlocks);

  return BlocksRouter;
};

export default initBlocksRoutes;
