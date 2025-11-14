import createHttpError from 'http-errors';
import { ctrlWrapper } from '../../utils/ctrl_wrapper.js';
import resendVerifyService from '../../services/auth/resend_verify_service.js';

const resendVerifyController = ctrlWrapper(async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw createHttpError(400, 'Email is required');
  }
  await resendVerifyService(email);
  res.status(200).json({
    message:
      'A verification email has been sent. Please check your inbox to verify your account.',
  });
});

export default resendVerifyController;
