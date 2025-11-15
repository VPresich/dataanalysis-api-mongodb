import { ctrlWrapper } from '../../utils/ctrl_wrapper.js';
import getAvatarUrlService from '../../services/users/get_avatar_service.js';

/**
 * Controller to get the current user's avatarUrl.
 * Uses getUserAvatarUrl service and sends response.
 */
const getAvatarUrlController = ctrlWrapper(async (req, res) => {
  const { id } = req.user;
  const result = await getAvatarUrlService(id);
  res.status(200).json({ avatarURL: result });
});

export default getAvatarUrlController;
