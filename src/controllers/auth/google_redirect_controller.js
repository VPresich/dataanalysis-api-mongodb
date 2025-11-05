import { ctrlWrapper } from '../../utils/ctrl_wrapper.js';
import getGoogleTokens from '../../services/auth/get_google_token.js';
import getGoogleUserInfo from '../../services/auth/get_google_user_info.js';
import googleLoginService from '../../services/auth/google_login_service.js';

import { env } from '../../utils/env.js';

/**
 * Google OAuth redirect controller using services.
 *
 * Receives the authorization code from Google.
 * Uses `googleGetTokens` service to exchange code for access token.
 * Uses `googleGetUserInfo` service to fetch user info from Google.
 * Uses `googleLoginService` to find or create a user and generate JWT.
 * Redirects to frontend with JWT token as query parameter.
 */
const googleRedirectController = ctrlWrapper(async (req, res) => {
  const code = req.query.code;
  const frontEndURL = env('FRONTEND_BASE_URL');

  if (!code) {
    return res.redirect(`${frontEndURL}?error=missing_code`);
  }

  // Exchange code for tokens
  const tokens = await getGoogleTokens(
    code,
    `${process.env.BACKEND_BASE_URL}/auth/google-redirect`
  );

  // Get user info from Google
  const userInfo = await getGoogleUserInfo(tokens.access_token);

  // Find or create user, generate JWT
  const jwtToken = await googleLoginService({ userInfo, tokens });

  // Redirect to frontend with JWT token
  return res.redirect(`${frontEndURL}?token=${jwtToken}`);
});

export default googleRedirectController;
