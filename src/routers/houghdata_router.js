import express from 'express';
import houghData from '../controllers/hough_data/index.js';

const houghDataRouter = express.Router();

houghDataRouter.get('/', houghData.getAllHoughDataController);

export default houghDataRouter;
