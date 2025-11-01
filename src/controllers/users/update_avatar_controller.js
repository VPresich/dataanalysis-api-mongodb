// import User from '../../models/user.js';
// import createHttpError from 'http-errors';
// import { ctrlWrapper } from '../../utils/ctrl_wrapper.js';
// import saveFileToCloudinary from '../../utils/save_file_to_cloudinary.js';
// import saveFileToUploadDir from '../../utils/save_file_to_uploaddir.js';
// import { AVATAR_SIZE } from '../../constants/index.js';

// const updateAvatarController = ctrlWrapper(async (req, res, next) => {
//   const { id } = req.user;
//   const file = req.file; // req.file — это объект с данными загруженного файла

//   if (!file) {
//     throw createHttpError(400, 'File is required');
//   }

//   let avatarURL;

//   if (process.env.ENABLE_CLOUDINARY === 'true') {
//     avatarURL = await saveFileToCloudinary(
//       file.path,
//       file.filename,
//       'avatars',
//       AVATAR_SIZE
//     );
//   } else {
//     avatarURL = await saveFileToUploadDir(file);
//   }

//   const updatedUser = await User.findByIdAndUpdate(
//     id,
//     { avatarURL },
//     { new: true }
//   );

//   if (!updatedUser) {
//     throw createHttpError(401, 'Unauthorized');
//   }

//   res.status(200).json({
//     avatarURL,
//   });
// });

// export default updateAvatarController;

import { ctrlWrapper } from '../../utils/ctrl_wrapper.js';
import updateAvatarService from '../../services/users/update_avatar_service.js';

/**
 * Controller: handles request and response only.
 * All database and upload logic lives in the service layer.
 */
const updateAvatarController = ctrlWrapper(async (req, res) => {
  const { id } = req.user;
  const { file } = req;

  const avatarURL = await updateAvatarService(id, file);

  res.status(200).json({ avatarURL });
});

export default updateAvatarController;
