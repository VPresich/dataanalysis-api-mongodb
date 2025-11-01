import { ctrlWrapper } from '../../utils/ctrl_wrapper.js';
import { loginService } from '../../services/auth/login_service.js';

/**
 * Login controller
 *
 * Receives credentials from the client,
 * calls the login service,
 * and returns a JSON response with token and user data.
 */
const loginController = ctrlWrapper(async (req, res) => {
  const { email, password } = req.body;
  const result = await loginService(email, password);
  res.status(200).json(result);
});

export default loginController;
