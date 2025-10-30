import { ctrlWrapper } from '../../utils/ctrl_wrapper.js';
import getUserThemeService from '../../services/users/get_user_theme_service.js';

/**
 * Controller to get the current user's theme.
 * Uses getUserTheme service and sends response.
 */
const getThemeController = ctrlWrapper(async (req, res) => {
  const { id } = req.user;
  const theme = await getUserThemeService(id);
  res.status(200).json({ theme });
});

export default getThemeController;
