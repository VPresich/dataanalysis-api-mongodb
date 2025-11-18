import express from 'express';
import validateBody from '../middlewares/validate_body.js';
import authMiddleware from '../middlewares/auth_middleware.js';
import uploadMiddleware from '../middlewares/upload_middleware.js';
import users from '../controllers/users/index.js';
import { uploadFile } from '../middlewares/upload_middleware.js';
import { fixEmptyAvatar } from '../middlewares/fix_empty_avatar_middlewarw.js';
import { profileSchema, themeSchema } from '../schemas/user_schemas.js';

const usersRouter = express.Router();

usersRouter.get('/current', authMiddleware, users.getCurrentController);
usersRouter.patch(
  '/',
  authMiddleware,
  validateBody(profileSchema),
  users.updateInfoController
);

usersRouter.patch(
  '/avatars',
  authMiddleware,
  uploadMiddleware.single('avatar'),
  users.updateAvatarController
);

usersRouter.get('/avatars', authMiddleware, users.getAvatarUrlController);

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
  uploadFile('avatar', false),
  fixEmptyAvatar,
  validateBody(profileSchema),
  users.updateProfileController
);

export default usersRouter;
