import multer from 'multer';
import path from 'node:path';
import crypto from 'node:crypto';
import { TEMP_UPLOAD_DIR, FILE_SIZE } from '../constants/index.js';

const multerConfig = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, TEMP_UPLOAD_DIR),

  filename: (_req, file, cb) => {
    const extName = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, extName);
    const suffix = crypto.randomUUID();
    cb(null, `${baseName}-${suffix}${extName}`);
  },
});

const uploader = multer({
  storage: multerConfig,
  limits: { fileSize: FILE_SIZE },
});

export default uploader;

/**
 * Generic upload middleware
 * @param {string} fieldName
 * @param {boolean} required — is required file
 */
export function uploadFile(fieldName, required = true) {
  return function (req, res, next) {
    uploader.single(fieldName)(req, res, err => {
      if (err) return next(err); // multer error

      if (required && !req.file) {
        return res.status(400).json({
          message: `File "${fieldName}" is required`,
        });
      }

      next();
    });
  };
}
