import { ctrlWrapper } from '../../utils/ctrl_wrapper.js';
import updateUserThemeService from '../../services/users/update_user_theme_service.js';

/**
 * Controller to update the current user's theme.
 * Receives color from request body and updates user's theme.
 */
const updateThemeController = ctrlWrapper(async (req, res) => {
  const { id } = req.user;
  const { color } = req.body;

  const updatedTheme = await updateUserThemeService(id, color);

  res.status(200).json({ theme: updatedTheme });
});

export default updateThemeController;
