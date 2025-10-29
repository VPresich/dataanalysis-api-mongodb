import path from 'node:path';
import createHttpError from 'http-errors';
import User from '../../models/user.js';
import { ctrlWrapper } from '../../utils/ctrl_wrapper.js';

const getAvatarController = ctrlWrapper(async (req, res, next) => {
  const { id, avatarURL } = req.user;

  const user = await User.findById(id);
  if (!user) {
    throw createHttpError(401, 'User not found');
  }
  if (!user.avatarURL) {
    throw createHttpError(404, 'Avatar not found');
  }

  if (avatarURL.includes('gravatar')) {
    return res.redirect(avatarURL);
  }

  const avatarDir = path.resolve('public', avatarURL);
  res.status(200).sendFile(avatarDir);
});

export default getAvatarController;
