import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { definition } from '../../schema/v1/backend';

/**
 * @function initDocsRoutes To initialize '/block' routes
 * @returns {Router} Returns docs router
 */
const initDocsRoutes = () => {
  const DocsRouter = express.Router();

  DocsRouter.use('/', swaggerUi.serve, swaggerUi.setup(definition));
  return DocsRouter;
};

export default initDocsRoutes;
