import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import User from '../../models/user.js';
import { ctrlWrapper } from '../../utils/ctrl_wrapper.js';
import { uploadFileToCloudinary } from '../../utils/upload_cloudinary.js';
import { AVATAR_SIZE } from '../../constants/index.js';
import { deleteFile } from '../../helpers/imageUtiles.js';

export const updateProfileController = ctrlWrapper(async (req, res, next) => {
  const { name, email, password } = req.body;
  const { id } = req.user;
  const { path: tempUpload } = req.file;

  const existingUser = await User.findOne({ email });
  if (existingUser && !existingUser._id.equals(id)) {
    throw createHttpError(409, 'Email already in use');
  }

  let hashPassword = null;
  if (password) {
    hashPassword = await bcrypt.hash(password, 10);
  }
  const fileName = `${id}avatar`;
  const folder = 'avatars';
  let avatarURL = '';
  if (tempUpload) {
    avatarURL = await uploadFileToCloudinary(
      tempUpload,
      fileName,
      folder,
      AVATAR_SIZE
    );
  }
  await deleteFile(tempUpload);
  const updatedUserData = {};
  if (name) updatedUserData.name = name;
  if (email) updatedUserData.email = email;
  if (hashPassword) updatedUserData.password = hashPassword;
  if (avatarURL) updatedUserData.avatarURL = avatarURL;

  const updatedUser = await User.findByIdAndUpdate(id, updatedUserData, {
    new: true,
  });

  res.status(200).json({
    name: updatedUser.name,
    email: updatedUser.email,
    avatarURL: updatedUser.avatarURL,
    theme: updatedUser.theme,
  });
});

export default updateProfileController;
