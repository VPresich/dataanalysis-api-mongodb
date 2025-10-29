import createHttpError from 'http-errors';
import User from '../../models/user.js';
import { ctrlWrapper } from '../../utils/ctrl_wrapper.js';

const verifyEmailController = ctrlWrapper(async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw createHttpError(404, 'User not found');
  }
  if (user.verify) {
    throw createHttpError(400, 'Verification has already been passed');
  }
  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });

  res.status(200).json({
    message: 'Verification successful',
  });
});

export default verifyEmailController;
