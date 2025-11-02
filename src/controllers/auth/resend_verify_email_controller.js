import createHttpError from 'http-errors';
import { ctrlWrapper } from '../../utils/ctrl_wrapper.js';
import { resendVerificationEmailService } from '../../services/auth/resend_verify_email_service.js';

const resendVerifyEmailController = ctrlWrapper(async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw createHttpError(400, 'Email is required');
  }
  await resendVerificationEmailService(email);
  res.json({
    message: 'Verify email sent',
  });
});

export default resendVerifyEmailController;
