import express from 'express';
import validateTimeParams from '../middlewares/validate_time_params.js';
import dataAnalysis from '../controllers/data_analysis/index.js';

const dataAnalysisRouter = express.Router();

dataAnalysisRouter.get('/', dataAnalysis.getAllDataController);
//dataAnalysisRouter.get('/:number', dataAnalysis.getDataByNumberController);
dataAnalysisRouter.get(
  '/:number',
  validateTimeParams,
  dataAnalysis.getFilteredDataController
);

export default dataAnalysisRouter;
