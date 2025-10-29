import { ctrlWrapper } from '../../utils/ctrl_wrapper.js';

const getCurrentController = ctrlWrapper(async (req, res, next) => {
  const { name, email, avatarURL, theme } = req.user;

  res.json({ name, email, avatarURL, theme });
});

export default getCurrentController;
