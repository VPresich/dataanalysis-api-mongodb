import express from 'express';
// import validateTimeParams from '../middlewares/validate_time_params.js';
import data from '../controllers/data/index.js';
import authMiddleware from '../middlewares/auth_middleware.js';
import uploadMiddleware from '../middlewares/upload_middleware.js';
import validateBody from '../middlewares/validate_body.js';
import validateParam from '../middlewares/validate_param.js';
import { dataSchema, sourceNumberSchema } from '../schemas/data_schemas.js';

const dataRouter = express.Router();

// dataRouter.get(
//   '/:number',
//   authMiddleware,
//   validateParam(sourceNumberSchema, 'number'),
//   validateTimeParams,
//   data.getFilteredDataBySourceController
// );

dataRouter.get(
  '/:number',
  authMiddleware,
  validateParam(sourceNumberSchema, 'number'),
  data.getDataBySourceController
);

dataRouter.patch(
  '/upload',
  authMiddleware,
  uploadMiddleware.single('datafile'),
  validateBody(dataSchema),
  data.uploadDataController
);

dataRouter.delete(
  '/delete/:number',
  authMiddleware,
  validateParam(sourceNumberSchema, 'number'),
  data.deleteDataBySourceController
);

dataRouter.get('/noname/data', data.getNonameDataController);
dataRouter.get(
  '/noname/data/:number',
  validateParam(sourceNumberSchema, 'number'),
  data.getNonameDataBySourceController
);

export default dataRouter;
