/**
 * Service for returning the current user's public info.
 * @param {Object} user - The authenticated user object from req.user
 * @returns {Object} Public user data
 */
const getCurrentUserService = async user => {
  if (!user) {
    throw new Error('User data not found in request');
  }

  const { name, email, avatarURL, theme } = user;

  return { name, email, avatarURL, theme };
};

export default getCurrentUserService;
