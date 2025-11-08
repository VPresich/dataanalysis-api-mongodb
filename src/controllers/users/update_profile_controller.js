import { ctrlWrapper } from '../../utils/ctrl_wrapper.js';
import updateUserProfileService from '../../services/users/update_user_profile_service.js';

/**
 * Controller: Updates the user's profile information (name, password, theme, avatar).
 * Handles the request, calls the update service, and returns the updated user data.
 */
export const updateProfileController = ctrlWrapper(async (req, res, next) => {
  const { id } = req.user;
  const { file } = req;
  const { name, password, theme } = req.body;
  const updatedUser = await updateUserProfileService({
    id,
    name,
    password,
    theme,
    file,
  });

  res.status(200).json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    theme: updatedUser.theme,
    avatarURL: updatedUser.avatarURL,
  });
});

export default updateProfileController;
