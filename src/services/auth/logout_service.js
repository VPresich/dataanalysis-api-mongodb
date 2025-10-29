import User from '../../models/user.js';

/**
 * Logout service
 *
 * Clears the user's JWT token in the database.
 *
 * @param {string} userId - ID of the user to log out
 */
const logoutService = async userId => {
  await User.findByIdAndUpdate(userId, { token: null });
};

export default logoutService;
