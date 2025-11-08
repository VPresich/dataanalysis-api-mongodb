import express from 'express';
import authMiddleware from '../middlewares/auth_middleware.js';
import dataSources from '../controllers/data_sources/index.js';
import validateParam from '../middlewares/validate_param.js';
import validateBody from '../middlewares/validate_body.js';
import uploadMiddleware from '../middlewares/upload_middleware.js';
import { sourceNumberSchema, dataSchema } from '../schemas/data_schemas.js';

const sourcesRouter = express.Router();

sourcesRouter.get('/', authMiddleware, dataSources.getAllSourcesController);
sourcesRouter.get('/noname/sources', dataSources.getNonameSourcesController);

sourcesRouter.delete(
  '/delete/:sourceNumber',
  authMiddleware,
  validateParam(sourceNumberSchema, 'sourceNumber'),
  dataSources.deleteDataBySourceController
);

sourcesRouter.delete(
  '/',
  authMiddleware,
  dataSources.deleteAllSourcesAndDataController
);

sourcesRouter.patch(
  '/upload',
  authMiddleware,
  uploadMiddleware.single('datafile'),
  validateBody(dataSchema),
  dataSources.uploadDataController
);

export default sourcesRouter;
