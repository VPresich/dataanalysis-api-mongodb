// import 'dotenv/config';
// import path from 'node:path';
// import express from 'express';
// import morgan from 'morgan';
// import cors from 'cors';

// import './routers/db.js';
// import routers from './routers/index.js';

// const app = express();
// app.use(cors());
// app.use(morgan('tiny'));
// app.use(express.json());
// app.use(express.static(path.resolve('public')));

// // for debuging
// // app.use((req, res, next) => {
// //   console.log(`Incoming request: ${req.method} ${req.originalUrl}`);
// //   next();
// // });

// app.use('/api', routers);

// app.use((req, res, next) => {
//   res.set('Cache-Control', 'no-store');
//   res.set('Pragma', 'no-cache');
//   res.set('Expires', '0');
//   next();
// });

// app.use((_, res) => {
//   res.status(404).json({ message: 'Route not found' });
// });

// app.use((err, req, res, next) => {
//   const { status = 500, message = 'Server error' } = err;
//   res.status(status).json({ message });
// });

// app.listen(8000, () => {
//   console.log('Server is running. Use our API on port: 8000');
// });

import { initMongoConnection } from './init_database.js';
import { setupServer } from './setup_server.js';
import { createDirIfNotExists } from './utils/create_dir.js';
import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from './constants/index.js';

const bootstrap = async () => {
  await initMongoConnection();
  await createDirIfNotExists(TEMP_UPLOAD_DIR);
  await createDirIfNotExists(UPLOAD_DIR);
  setupServer();
};

bootstrap();
