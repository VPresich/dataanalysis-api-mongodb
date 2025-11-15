import express from 'express';
import validateBody from '../middlewares/validate_body.js';
import authMiddleware from '../middlewares/auth_middleware.js';
import auth from '../controllers/auth/index.js';
import {
  registerSchema,
  loginSchema,
  emailSchema,
  resetPasswordSchema,
} from '../schemas/user_schemas.js';

const authRouter = express.Router();

authRouter.post(
  '/register',
  validateBody(registerSchema),
  auth.registerController
);
authRouter.post('/login', validateBody(loginSchema), auth.loginController);
authRouter.post('/logout', authMiddleware, auth.logoutController);
authRouter.get('/google', auth.googleAuthController);
authRouter.get('/google-redirect', auth.googleRedirectController);

// forgot password
authRouter.post(
  '/request-reset-pwd',
  validateBody(emailSchema),
  auth.requestResetPwdController
);
authRouter.post(
  '/reset-pwd',
  validateBody(resetPasswordSchema),
  auth.resetPwdController
);

//verification email
authRouter.post(
  '/resend-verify',
  validateBody(emailSchema),
  auth.resendVerifyController
);
authRouter.get('/verify/:verificationToken', auth.verifyEmailController);

export default authRouter;
