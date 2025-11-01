import path from 'node:path';
import fs from 'node:fs/promises';
import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from '../constants/index.js';
import { env } from './env.js';

/**
 * Moves a file from the temporary upload directory to the permanent uploads directory
 * and returns its public URL.
 *
 * @param {Object} file - The uploaded file object (e.g., from Multer).
 * @param {string} file.filename - The name of the file stored in the temporary directory.
 * @returns {Promise<string>} - The full public URL of the uploaded file.
 */
const saveFileToUploadDir = async file => {
  await fs.rename(
    path.join(TEMP_UPLOAD_DIR, file.filename),
    path.join(UPLOAD_DIR, file.filename)
  );

  return `${env('APP_DOMAIN')}/uploads/${file.filename}`;
};

export default saveFileToUploadDir;
