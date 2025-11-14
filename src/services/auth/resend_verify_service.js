import createHttpError from 'http-errors';
import crypto from 'node:crypto';
import User from '../../models/user.js';
import { env } from '../../utils/env.js';
import { sendToken } from './send_token.js';

export const resendVerifyService = async email => {
  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) throw createHttpError(404, 'User not found');
  if (user.verify) throw createHttpError(400, 'User already verified');

  const verificationToken = user.verificationToken || crypto.randomUUID();
  user.verificationToken = verificationToken;
  await user.save();

  const link = `${env('BACKEND_BASE_URL')}/auth/verify/${verificationToken}`;

  await sendToken(
    email.toLowerCase(),
    'Verify your email address',
    link,
    'verification_email.html'
  );
};

export default resendVerifyService;
