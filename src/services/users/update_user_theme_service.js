import User from '../../models/user.js';
import createHttpError from 'http-errors';

/**
 * Service to update the theme color of a user.
 * @param {string} userId - ID of the user
 * @param {string} color - New theme color
 * @returns {string} updated theme color
 * @throws HTTPError 404 if user not found
 */
const updateUserThemeService = async (userId, theme) => {
  const user = await User.findById(userId);
  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  user.theme = theme;
  await user.save();

  return user.theme;
};

export default updateUserThemeService;
