import User from '../../models/user.js';
import createHttpError from 'http-errors';
import { ctrlWrapper } from '../../utils/ctrl_wrapper.js';
import Theme from '../../models/theme.js';

const updateThemeController = ctrlWrapper(async (req, res, next) => {
  const { id, app } = req.user;
  const { color } = req.body;
  const user = await User.findById(id);
  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  let theme = await Theme.findOne({ user: id, app });

  if (!theme) {
    theme = await Theme.create({ user: id, app, color });
  } else {
    theme.color = color;
    await theme.save();
  }

  res.status(200).json({ theme: theme.color });
});

export default updateThemeController;
