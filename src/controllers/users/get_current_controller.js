import { ctrlWrapper } from '../../utils/ctrl_wrapper.js';
import getCurrentUserService from '../../services/users/get_current_service.js';

/**
 * Controller for getting current user info.
 * Extracts user data from request and returns profile info.
 */
const getCurrentController = ctrlWrapper(async (req, res, next) => {
  const userData = await getCurrentUserService(req.user);
  res.json(userData);
});

export default getCurrentController;
