import createHttpError from 'http-errors';
import crypto from 'node:crypto';
import User from '../../models/user.js';
import sendVerificationToken from './send_verification_token.js';

export const resendVerificationEmailService = async email => {
  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) throw createHttpError(404, 'User not found');
  if (user.verify) throw createHttpError(400, 'User already verified');

  const verificationToken = user.verificationToken || crypto.randomUUID();
  user.verificationToken = verificationToken;
  await user.save();

  await sendVerificationToken(email.toLowerCase(), verificationToken);
};
