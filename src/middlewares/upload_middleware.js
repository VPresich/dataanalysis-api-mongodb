import multer from 'multer';
import path from 'node:path';
import crypto from 'node:crypto';
import { TEMP_UPLOAD_DIR } from '../constants/index.js';

const multerConfig = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, TEMP_UPLOAD_DIR);
  },

  filename: (req, file, cb) => {
    const extName = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, extName);
    const suffix = crypto.randomUUID();
    cb(null, `${baseName}-${suffix}${extName}`);
  },

  limits: { fileSize: 2 * 1024 * 1024 },
});

const uploadMiddleware = multer({ storage: multerConfig });

export default uploadMiddleware;
