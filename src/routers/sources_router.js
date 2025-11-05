import express from 'express';
import authMiddleware from '../middlewares/auth_middleware.js';
import dataSources from '../controllers/data_sources/index.js';

const sourcesRouter = express.Router();

sourcesRouter.get('/', authMiddleware, dataSources.getAllSourcesController);

export default sourcesRouter;
