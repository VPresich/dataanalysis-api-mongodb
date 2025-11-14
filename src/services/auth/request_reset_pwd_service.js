import jwt from 'jsonwebtoken';
import createHttpError from 'http-errors';
import User from '../../models/user.js';
import { env } from '../../utils/env.js';
import { sendToken } from './send_token.js';

/**
 * Sends a password reset email to a user.
 * @param {string} email - User's email address
 * @returns {Promise<void>}
 */
const requestResetPwdService = async email => {
  const user = await User.findOne({ email });
  if (!user) {
    throw createHttpError(404, 'User not found!');
  }

  const resetToken = jwt.sign({ sub: user._id, email }, env('JWT_SECRET'), {
    expiresIn: '15m',
  });

  const link = `${env('FRONTEND_BASE_URL')}password/reset/${resetToken}`;

  await sendToken(
    email.toLowerCase(),
    'Reset your password',
    link,
    'reset_password_email.html'
  );
};

export default requestResetPwdService;
