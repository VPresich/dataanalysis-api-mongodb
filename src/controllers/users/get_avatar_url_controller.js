import createHttpError from 'http-errors';
import User from '../../models/user.js';
import { ctrlWrapper } from '../../utils/ctrl_wrapper.js';

const getAvatarUrlController = ctrlWrapper(async (req, res, next) => {
  const { id, avatarURL } = req.user;

  const user = await User.findById(id);
  if (!user) {
    throw createHttpError(401);
  }
  if (!user.avatarURL) {
    throw createHttpError(404, 'Avatar not found');
  }
  res.status(200).json({ avatarURL });
});

export default getAvatarUrlController;
