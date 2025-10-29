import express from 'express';
import authRouter from './auth_router.js';
import usersRouter from './users_router.js';
import dataAnalysisRouter from './dataanalysis_router.js';
import houghDataRouter from './houghdata_router.js';
import { swaggerDocs } from '../middlewares/swagger_docs.js';

const routers = express.Router();

routers.use('/auth', authRouter);
routers.use('/users', usersRouter);
routers.use('/data', dataAnalysisRouter);
routers.use('/hough-data', houghDataRouter);
routers.use('/docs', swaggerDocs());

export default routers;
