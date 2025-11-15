import User from '../../models/user.js';
import createHttpError from 'http-errors';

/**
 * Service to get the theme of a user by their ID.
 * @param {string} userId
 * @returns {string} user's avatar
 * @throws HTTPError 401 if user not found
 * @throws HTTPError 404 if theme not set
 */
const getAvatarUrlService = async userId => {
  const user = await User.findById(userId);
  if (!user) {
    throw createHttpError(401, 'User not found');
  }
  if (!user.avatarURL) {
    throw createHttpError(404, 'User avatar not found');
  }
  return user.avatarURL;
};

export default getAvatarUrlService;
