import express from 'express';
import validateTimeParams from '../middlewares/validate_time_params.js';
import data from '../controllers/data/index.js';
import authMiddleware from '../middlewares/auth_middleware.js';
import uploadMiddleware from '../middlewares/upload_middleware.js';
import validateBody from '../middlewares/validate_body.js';
import { dataSchema } from '../schemas/data_schemas.js';

const dataRouter = express.Router();

dataRouter.get(
  '/:number',
  authMiddleware,
  validateTimeParams,
  data.getUserDataController
);

dataRouter.patch(
  '/upload',
  authMiddleware,
  uploadMiddleware.single('datafile'),
  validateBody(dataSchema),
  data.uploadDataController
);

export default dataRouter;
