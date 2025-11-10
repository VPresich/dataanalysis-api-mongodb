import express from 'express';
import authMiddleware from '../middlewares/auth_middleware.js';
import dataSources from '../controllers/data_sources/index.js';
import validateParam from '../middlewares/validate_param.js';
import validateBody from '../middlewares/validate_body.js';
import uploadMiddleware from '../middlewares/upload_middleware.js';
import {
  sourceNumberSchema,
  dataSchema,
  sourceUpdateSchema,
} from '../schemas/data_schemas.js';

const sourcesRouter = express.Router();

sourcesRouter.get('/noname/sources', dataSources.getNonameSourcesController);

sourcesRouter.get('/', authMiddleware, dataSources.getAllSourcesController);

sourcesRouter.post(
  '/',
  authMiddleware,
  uploadMiddleware.single('datafile'),
  validateBody(dataSchema),
  dataSources.uploadDataController
);

sourcesRouter.delete(
  '/',
  authMiddleware,
  dataSources.deleteAllSourcesAndDataController
);

sourcesRouter.delete(
  '/:sourceNumber',
  authMiddleware,
  validateParam(sourceNumberSchema, 'sourceNumber'),
  dataSources.deleteDataBySourceController
);

sourcesRouter.patch(
  '/:sourceNumber',
  authMiddleware,
  validateParam(sourceNumberSchema, 'sourceNumber'),
  validateBody(sourceUpdateSchema),
  dataSources.updateSourceController
);

export default sourcesRouter;
