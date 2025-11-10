import express from 'express';
import data from '../controllers/data/index.js';
import authMiddleware from '../middlewares/auth_middleware.js';
import validateParam from '../middlewares/validate_param.js';
import validateTimeParams from '../middlewares/validate_time_params.js';
import { sourceNumberSchema } from '../schemas/data_schemas.js';

const dataRouter = express.Router();

dataRouter.get(
  '/:sourceNumber/filter',
  authMiddleware,
  validateParam(sourceNumberSchema, 'sourceNumber'),
  validateTimeParams,
  data.getFilteredDataBySourceController
);

dataRouter.get(
  '/:sourceNumber',
  authMiddleware,
  validateParam(sourceNumberSchema, 'sourceNumber'),
  data.getDataBySourceController
);

dataRouter.get('/noname/data', data.getNonameDataController);

dataRouter.get(
  '/noname/data/:sourceNumber',
  validateParam(sourceNumberSchema, 'sourceNumber'),
  data.getNonameDataBySourceController
);

export default dataRouter;
