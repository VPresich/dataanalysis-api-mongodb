import { ctrlWrapper } from '../../utils/ctrl_wrapper.js';
import logoutService from '../../services/auth/logout_service.js';

/**
 * Logout controller
 *
 * Handles the logout request, calls the logout service,
 * and returns a 204 No Content response.
 */
const logoutController = ctrlWrapper(async (req, res) => {
  const { id } = req.user;
  await logoutService(id);
  res.status(204).end();
});

export default logoutController;
