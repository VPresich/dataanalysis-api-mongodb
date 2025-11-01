/**
 * Authentication middleware for Express.
 *
 * This middleware:
 * 1. Reads the JWT token from the "Authorization" header.
 * 2. Verifies the token using the secret.
 * 3. Finds the corresponding user in the database.
 * 4. Checks that the token matches the one stored in the user's record.
 * 5. Attaches user data to req.user for downstream handlers.
 *
 * If any step fails, it throws a 401 Unauthorized error.
 */

import createHttpError from 'http-errors';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import { DEF_THEME } from '../constants/index.js';

const authMiddleware = async (req, _, next) => {
  const appHeader = req.headers['x-app-name'] || 'dataanalysis';

  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return next(createHttpError(401, 'Unauthorized'));
  }

  const [bearer, token] = authHeader.split(' ');
  if (bearer !== 'Bearer' || !token) {
    return next(createHttpError(401, 'Unauthorized'));
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    // Get user by id
    const user = await User.findById(decode.id);
    if (!user || !user._id || !user.email || !user.name) {
      throw createHttpError(401, 'Unauthorized');
    }

    // Verify the token stored in the user's document
    if (user.token !== token) {
      throw createHttpError(401, 'Unauthorized');
    }

    // Prepare user data for the request
    req.user = {
      id: user._id,
      name: user.name,
      email: user.email,
      avatarURL: user.avatarURL,
      password: user.password,
      theme: user.theme || DEF_THEME,
      app: appHeader,
    };

    next();
  } catch {
    next(createHttpError(401, `Unauthorized`));
  }
};

export default authMiddleware;
