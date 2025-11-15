import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import { env } from '../../utils/env.js';
import User from '../../models/user.js';
import saveFileToCloudinary from '../../utils/save_file_to_cloudinary.js';
import saveFileToUploadDir from '../../utils/save_file_to_uploaddir.js';
import { AVATAR_SIZE } from '../../constants/index.js';

/**
 * Service: Updates user profile data (name, password, theme, avatar).
 */
const updateProfileService = async ({ id, name, password, theme, file }) => {
  const updatedUserData = {};
  if (name) updatedUserData.name = name;
  if (theme) updatedUserData.theme = theme;
  if (password) {
    updatedUserData.password = await bcrypt.hash(password, 10);
  }

  const useCloudinary = env('ENABLE_CLOUDINARY') === 'true';
  let avatarURL;

  if (file) {
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
    updatedUserData.avatarURL = avatarURL;
  }

  const updatedUser = await User.findByIdAndUpdate(id, updatedUserData, {
    new: true,
  });

  if (!updatedUser) {
    throw createHttpError(404, 'User not found');
  }

  return updatedUser;
};

export default updateProfileService;
