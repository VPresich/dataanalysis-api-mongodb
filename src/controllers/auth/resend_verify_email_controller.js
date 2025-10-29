import createHttpError from 'http-errors';
import crypto from 'node:crypto';
import User from '../../models/user.js';
import { ctrlWrapper } from '../../utils/ctrl_wrapper.js';
import sendVerificationToken from '../../helpers/sendVerificationToken.js';

const resendVerifyEmailController = ctrlWrapper(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  if (user.verify) {
    throw createHttpError(400, 'Verification has already been passed');
  }

  if (!user.verificationToken) {
    const verificationToken = crypto.randomUUID();
    user.verificationToken = verificationToken;
    await user.save();
  }

  await sendVerificationToken(email, user.verificationToken);
  res.json({
    message: 'Verify email sent',
  });
});

export default resendVerifyEmailController;
