import { ctrlWrapper } from '../../utils/ctrl_wrapper.js';
import { env } from '../../utils/env.js';
import verifyEmailService from '../../services/auth/verify_email_service.js';

const verifyEmailController = ctrlWrapper(async (req, res) => {
  const { verificationToken } = req.params;
  try {
    await verifyEmailService(verificationToken);

    res.redirect(`${env('FRONTEND_BASE_URL')}verified-success`);
  } catch {
    res.redirect(`${env('FRONTEND_BASE_URL')}verified-error`);
  }
});

export default verifyEmailController;
