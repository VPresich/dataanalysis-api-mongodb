import express from 'express';
import validateBody from '../middlewares/validate_body.js';
import authMiddleware from '../middlewares/auth_middleware.js';
import auth from '../controllers/auth/index.js';
import {
  registerSchema,
  loginSchema,
  emailSchema,
} from '../schemas/user_schemas.js';

const authRouter = express.Router();

authRouter.post(
  '/register',
  validateBody(registerSchema),
  auth.registerController
);
authRouter.get('/verify/:verificationToken', auth.verifyEmailController);
authRouter.post(
  '/verify',
  validateBody(emailSchema),
  auth.resendVerifyEmailController
);
authRouter.post('/login', validateBody(loginSchema), auth.loginController);
authRouter.post('/logout', authMiddleware, auth.logoutController);
authRouter.get('/google', auth.googleAuthController);
authRouter.get('/google-redirect', auth.googleRedirectController);

export default authRouter;
