import express from 'express';
import validateBody from '../middlewares/validate_body.js';
import authMiddleware from '../middlewares/auth_middleware.js';
import upload from '../middlewares/upload_middleware.js';
import users from '../controllers/users/index.js';
import { profileSchema, themeSchema } from '../schemas/user_schemas.js';

const usersRouter = express.Router();

usersRouter.get('/current', authMiddleware, users.getCurrentController);
usersRouter.patch(
  '/',
  authMiddleware,
  validateBody(profileSchema),
  users.getCurrentController
);

usersRouter.patch(
  '/avatars',
  authMiddleware,
  upload.single('avatar'),
  users.updateAvatarController
);

usersRouter.get('/avatar', authMiddleware, users.getAvatarUrlController);

usersRouter.patch(
  '/themes',
  authMiddleware,
  validateBody(themeSchema),
  users.updateThemeController
);

usersRouter.get('/themes', authMiddleware, users.getThemeController);

usersRouter.patch(
  '/profile',
  authMiddleware,
  upload.single('avatar'),
  validateBody(profileSchema),
  users.updateProfileController
);

export default usersRouter;
