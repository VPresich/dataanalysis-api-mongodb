import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { env } from './utils/env.js';
import routers from './routers/index.js';
import { errorHandler } from './middlewares/error_handler.js';
import { notFoundHandler } from './middlewares/notfound_handler.js';
import { UPLOAD_DIR } from './constants/index.js';

const PORT = Number(env('PORT', '8000'));

export const setupServer = () => {
  const app = express();
  app.use('/uploads', express.static(UPLOAD_DIR));

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    })
  );

  // app.use(cors());
  app.use(
    cors({
      origin: ['http://localhost:8000', 'http://localhost:5173'],
      credentials: true,
    })
  );

  app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');
    next();
  });

  app.use(express.json());

  app.use('/uploads', express.static(UPLOAD_DIR));
  app.use('/api', routers);

  app.use('*', notFoundHandler);
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
