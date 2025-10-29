import createHttpError from 'http-errors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../../models/user.js';
import { DEF_THEME } from '../../constants/index.js';

/**
 * Login service
 *
 * Handles user authentication logic:
 * - Finds user by email
 * - (Optionally) checks account verification
 * - Compares password
 * - Generates JWT token and saves it in DB
 *
 * @param {string} email - user email
 * @param {string} password - user password
 * @returns {object} - token and user data
 */
export const loginService = async (email, password) => {
  const emailInLowerCase = email.toLowerCase();

  const user = await User.findOne({ email: emailInLowerCase });
  if (!user) {
    throw createHttpError(401, 'Email or password is wrong');
  }

  // Uncomment if account verification is needed
  // if (!user.verify) {
  //   throw createHttpError(401, 'Your account is not verified');
  // }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw createHttpError(401, 'Email or password is wrong');
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '24h',
  });

  user.token = token;
  await user.save();

  return {
    token,
    user: {
      name: user.name,
      email: user.email,
      avatarURL: user.avatarURL,
      theme: user.theme || DEF_THEME,
    },
  };
};
