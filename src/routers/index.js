import express from 'express';
import authRouter from './auth_router.js';
import usersRouter from './users_router.js';
import dataRouter from './data_router.js';
import sourcesRouter from './sources_router.js';
import houghDataRouter from './houghdata_router.js';
import { swaggerDocs } from '../middlewares/swagger_docs.js';

const routers = express.Router();

routers.use('/auth', authRouter);
routers.use('/users', usersRouter);
routers.use('/data', dataRouter);
routers.use('/sources', sourcesRouter);
routers.use('/hough-data', houghDataRouter);

routers.use('/docs', swaggerDocs());

export default routers;
