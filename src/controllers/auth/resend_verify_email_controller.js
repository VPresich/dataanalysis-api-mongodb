import createHttpError from 'http-errors';
import { ctrlWrapper } from '../../utils/ctrl_wrapper.js';
import { resendVerificationEmailService } from '../../services/auth/resend_verify_email_service.js';

const resendVerifyEmailController = ctrlWrapper(async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw createHttpError(400, 'Email is required');
  }
  await resendVerificationEmailService(email);
  res(200).json({
    message:
      'A verification email has been sent. Please check your inbox to verify your account.',
  });
});

export default resendVerifyEmailController;
