import User from '../../models/user.js';
import { env } from '../../utils/env.js';
import createHttpError from 'http-errors';
import saveFileToCloudinary from '../../utils/save_file_to_cloudinary.js';
import saveFileToUploadDir from '../../utils/save_file_to_uploaddir.js';
import { AVATAR_SIZE } from '../../constants/index.js';

/**
 * Uploads avatar and updates user's avatarURL in the database.
 * Handles both Cloudinary and local upload depending on environment.
 *
 * @param {string} userId - ID of the user
 * @param {Object} file - Multer file object
 * @returns {Promise<string>} - New avatar URL
 */
export const updateAvatarService = async (userId, file) => {
  if (!file) {
    throw createHttpError(400, 'File is required');
  }

  const useCloudinary = env('ENABLE_CLOUDINARY') === 'true';

  let avatarURL;

  if (useCloudinary) {
    avatarURL = await saveFileToCloudinary(
      file.path,
      file.filename,
      'avatars',
      AVATAR_SIZE
    );
  } else {
    avatarURL = await saveFileToUploadDir(file);
  }

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { avatarURL },
    { new: true }
  );

  if (!updatedUser) {
    throw createHttpError(404, 'User not found');
  }

  return avatarURL;
};

export default updateAvatarService;
