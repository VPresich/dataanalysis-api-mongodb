import User from '../../models/user.js';
import createHttpError from 'http-errors';
import { ctrlWrapper } from '../../utils/ctrl_wrapper.js';

const getThemeController = ctrlWrapper(async (req, res, next) => {
  const { id, theme } = req.user;

  const user = await User.findById(id);
  if (!user) {
    throw createHttpError(401, 'Not found');
  }
  if (!user.theme) {
    throw createHttpError(404, 'Theme not found');
  }
  res.status(200).json({ theme });
});

export default getThemeController;
