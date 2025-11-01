import cloudinary from 'cloudinary';
import fs from 'node:fs/promises';
import { env } from './env.js';
import { CLOUDINARY } from '../constants/index.js';

// Configure Cloudinary using environment variables
cloudinary.v2.config({
  secure: true, // Use HTTPS for all URLs
  cloud_name: env(CLOUDINARY.CLOUD_NAME),
  api_key: env(CLOUDINARY.API_KEY),
  api_secret: env(CLOUDINARY.API_SECRET),
});

/**
 * Uploads a file to Cloudinary and returns the secure URL of the uploaded image.
 *
 * @param {string} filePath - Path to the local file to be uploaded.
 * @param {string} newFileName - The name under which the file will be saved in Cloudinary.
 * @param {string} folder - The Cloudinary folder where the file will be stored.
 * @param {number} size - The desired width and height of the image after transformation.
 * @returns {Promise<string>} - A secure (HTTPS) URL of the uploaded image.
 */
async function saveFileToCloudinary(filePath, newFileName, folder, size) {
  try {
    // Upload the file to Cloudinary with the specified parameters
    const result = await cloudinary.uploader.upload(filePath, {
      public_id: newFileName,
      folder: folder,
      allowed_formats: ['jpg', 'jpeg', 'png'],
      transformation: [{ width: size, height: size }],
    });

    await fs.unlink(filePath);

    return result.secure_url;
  } catch (error) {
    console.error('Error uploading file to Cloudinary:', error);
    throw error;
  }
}

export default saveFileToCloudinary;
