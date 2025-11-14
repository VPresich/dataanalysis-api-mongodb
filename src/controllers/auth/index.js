import registerController from './register_controller.js';
import loginController from './login_controller.js';
import logoutController from './logout_controller.js';
import googleAuthController from './google_auth_controller.js';
import googleRedirectController from './google_redirect_controller.js';
import resendVerifyController from './resend_verify_controller.js';
import verifyEmailController from './verify_email_controller.js';
import requestResetPwdController from './request_reset_pwd_controller.js';

export default {
  registerController,
  loginController,
  logoutController,
  verifyEmailController,
  resendVerifyController,
  googleAuthController,
  googleRedirectController,
  requestResetPwdController,
};
