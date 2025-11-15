import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../../models/user.js';
import { env } from '../../utils/env.js';
/**
 * Resets user password if the provided JWT reset token is valid and not expired.
 * Token must contain the user's ID and be signed with the server secret.
 *
 * @param {string} password - New password
 * @param {string} token - Reset token from email
 * @returns {Promise<void>}
 */
const resetPwdService = async (password, token) => {
  let entries;

  try {
    entries = jwt.verify(token, env('JWT_SECRET'));
  } catch (err) {
    if (err instanceof Error) throw createHttpError(401, err.message);
    throw err;
  }
  const user = await User.findOne({
    email: entries.email,
    _id: entries.sub,
  });

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  const encryptedPassword = await bcrypt.hash(password, 10);
  await User.updateOne({ _id: user._id }, { password: encryptedPassword });
};

export default resetPwdService;
