import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../../models/user.js';
import { PATH_DEF_LIGHT_AVATAR } from '../../constants/index.js';

/**
 * Service for handling Google OAuth login.
 *
 * Steps:
 * 1. Check if a user with the given Google ID already exists.
 * 2. If not, try finding a user by email:
 *    - If found and no Google ID, link the Google ID.
 *    - If not found, create a new user with Google ID and default values.
 * 3. Generate a JWT token for the user.
 * 4. Save the token in the user document.
 * 5. Return the JWT token for frontend use.
 *
 * @param {Object} params - The parameters object.
 * @param {Object} params.userInfo - The user info received from Google.
 * @param {Object} params.tokens - The tokens received from Google (access, id tokens).
 * @returns {string} JWT token for authentication.
 */
export const googleLoginService = async ({ userInfo, tokens }) => {
  const { id: googleId, email, name } = userInfo;
  const emailLower = email.toLowerCase();

  let user = await User.findOne({ googleId });

  if (!user) {
    user = await User.findOne({ email: emailLower });

    if (user) {
      if (!user.googleId) {
        user.googleId = googleId;
        await user.save();
      }
    } else {
      const hashPassword = await bcrypt.hash('random_password', 10);
      user = new User({
        name,
        email: emailLower,
        password: hashPassword,
        googleId,
        avatarURL: PATH_DEF_LIGHT_AVATAR,
        verificationToken: 'verified',
        verify: true,
      });
      await user.save();
    }
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '24h',
  });

  user.token = token;
  await user.save();

  return token;
};

export default googleLoginService;
