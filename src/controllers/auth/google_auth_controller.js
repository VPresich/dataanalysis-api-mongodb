//

import { ctrlWrapper } from '../../utils/ctrl_wrapper.js';
import queryString from 'query-string';

/**
 * Google OAuth Controller
 *
 * This controller redirects the user to Google's OAuth 2.0 consent screen.
 * It prepares a URL with all required query parameters (client ID, redirect URI, scopes, etc.)
 * and then sends the user to that URL to authorize access.
 *
 * After successful authorization, Google will redirect the user
 * back to your backend at /auth/google-redirect with a temporary authorization code.
 */
const googleAuthController = ctrlWrapper(async (_req, res, _next) => {
  // Define the redirect URI that Google will call after user authorization
  const redirectURI = `${process.env.BACKEND_BASE_URL}/auth/google-redirect`;

  // Create the query parameters required for the Google OAuth 2.0 request
  const stringifiedParams = queryString.stringify({
    client_id: process.env.GOOGLE_CLIENT_ID,
    redirect_uri: redirectURI,
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ].join(' '),
    response_type: 'code', // Google will return an authorization code
    access_type: 'offline', // Allows obtaining a refresh token
    prompt: 'consent', // Forces Google to show the consent screen every time
  });

  // Build the final URL for redirecting the user to Google's OAuth consent screen
  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`;

  // Redirect the user to Google's OAuth page
  return res.redirect(googleAuthUrl);
});

export default googleAuthController;
