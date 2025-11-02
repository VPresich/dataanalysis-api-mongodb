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

//verification email
authRouter.post(
  '/verify',
  validateBody(emailSchema),
  auth.resendVerifyEmailController
);
authRouter.get('/verify/:verificationToken', auth.verifyEmailController);

authRouter.post('/login', validateBody(loginSchema), auth.loginController);
authRouter.post('/logout', authMiddleware, auth.logoutController);
authRouter.get('/google', auth.googleAuthController);
authRouter.get('/google-redirect', auth.googleRedirectController);

// change password
authRouter.post(
  '/send-reset-email',
  validateBody(emailSchema),
  auth.requestResetEmailController
);
authRouter.post('/reset-pwd', validateBody(resetPasswordSchema));

export default authRouter;
