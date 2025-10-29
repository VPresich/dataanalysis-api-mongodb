import User from '../../models/user.js';
import createHttpError from 'http-errors';
import { ctrlWrapper } from '../../utils/ctrl_wrapper.js';
import { uploadFileToCloudinary } from '../../utils/upload_cloudinary.js';
import { deleteFile } from '../../helpers/imageUtiles.js';
import { AVATAR_SIZE } from '../../constants/index.js';

const updateAvatarController = ctrlWrapper(async (req, res, next) => {
  const { id } = req.user;
  const { path: tempUpload } = req.file;

  const fileName = `${id}avatar`;
  const folder = 'avatars';
  const avatarURL = await uploadFileToCloudinary(
    tempUpload,
    fileName,
    folder,
    AVATAR_SIZE
  );

  await deleteFile(tempUpload);
  const updatedUser = await User.findByIdAndUpdate(
    id,
    { avatarURL },
    { new: true }
  );

  if (!updatedUser) {
    throw createHttpError(401, 'Not found');
  }

  res.status(200).json({
    avatarURL,
  });
});

export default updateAvatarController;
