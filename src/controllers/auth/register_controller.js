import { ctrlWrapper } from '../../utils/ctrl_wrapper.js';
import registerService from '../../services/auth/register_service.js';
/**
 * Registers a new user.
 * Handles user creation and returns authentication details.
 *
 * @param {object} req - Express request object.
 * @param {object} req.body - Request body.
 * @param {string} req.body.name - User's full name.
 * @param {string} req.body.email - User's email address.
 * @param {string} req.body.password - User's password.
 * @param {object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {Promise<void>} Sends JSON response
 * @throws {HttpError} 409 if email is already in use.
 */

const registerController = ctrlWrapper(async (req, res) => {
  const { name, email, password } = req.body;

  // Call the service that handles registration
  const result = await registerService({ name, email, password });

  // Respond with 201 Created and user info
  res.status(201).json(result);
});

export default registerController;
