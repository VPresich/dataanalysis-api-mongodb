import createHttpError from 'http-errors';
import User from '../../models/user.js';

const verifyEmailService = async verificationToken => {
  const user = await User.findOne({ verificationToken });

  if (!user) {
    throw createHttpError(404, 'Invalid or expired verification token');
  }

  if (user.verify) {
    throw createHttpError(400, 'User already verified');
  }

  user.verify = true;
  user.verificationToken = null;
  await user.save();

  return user;
};

export default verifyEmailService;
