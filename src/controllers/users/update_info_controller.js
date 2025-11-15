import { ctrlWrapper } from '../../utils/ctrl_wrapper.js';
import updateInfoService from '../../services/users/update_info_service.js';

/**
 * Controller: handles PATCH /user request to update user profile info.
 */
export const updateInfoController = ctrlWrapper(async (req, res) => {
  const { id } = req.user;
  const { name, password, theme } = req.body;

  const updatedUser = await updateInfoService({
    id,
    name,
    password,
    theme,
  });

  res.status(200).json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    theme: updatedUser.theme,
    avatarURL: updatedUser.avatarURL,
  });
});

export default updateInfoController;
