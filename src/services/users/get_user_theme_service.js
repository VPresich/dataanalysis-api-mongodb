import User from '../../models/user.js';
import createHttpError from 'http-errors';

/**
 * Service to get the theme of a user by their ID.
 * @param {string} userId
 * @returns {string} user's theme
 * @throws HTTPError 401 if user not found
 * @throws HTTPError 404 if theme not set
 */
const getUserThemeService = async userId => {
  const user = await User.findById(userId);
  if (!user) {
    throw createHttpError(401, 'User not found');
  }
  if (!user.theme) {
    throw createHttpError(404, 'Theme not found');
  }
  return user.theme;
};

export default getUserThemeService;
