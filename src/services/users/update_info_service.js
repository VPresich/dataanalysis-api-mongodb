import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import User from '../../models/user.js';

/**
 * Service: updates user profile data (name, email, password, theme)
 * @param {Object} params - update parameters
 * @param {string} params.id - user id
 * @param {string} [params.name] - new name
 * @param {string} [params.password] - new password (will be hashed)
 * @param {string} [params.theme] - new theme
 * @returns {Promise<Object>} updated user document
 */
const updateInfoService = async ({ id, name, email, password, theme }) => {
  const updatedUserData = {};
  if (name) updatedUserData.name = name;
  if (theme) updatedUserData.theme = theme;

  if (password) {
    updatedUserData.password = await bcrypt.hash(password, 10);
  }

  const updatedUser = await User.findByIdAndUpdate(id, updatedUserData, {
    new: true,
  });
  if (!updatedUser) throw createHttpError(404, 'User not found');

  return updatedUser;
};

export default updateInfoService;
