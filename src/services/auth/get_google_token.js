import axios from 'axios';
import createHttpError from 'http-errors';

/**
 * Exchange Google OAuth 2.0 authorization code for access and ID tokens.
 *
 * This function sends a POST request to Google's token endpoint to exchange
 * the temporary authorization code (received after user consent) for an access
 * token and an ID token. The access token can be used to fetch user info,
 * while the ID token contains identity claims about the user.
 *
 * @param {string} code - Authorization code returned by Google after user consent.
 * @param {string} redirectUri - The redirect URI used in the OAuth flow.
 * @returns {Promise<Object>} - An object containing access_token, id_token, expires_in, etc.
 * @throws {HttpError} - Throws 401 if fetching tokens from Google fails.
 */
const getGoogleTokens = async (code, redirectUri) => {
  try {
    const response = await axios.post(
      'https://oauth2.googleapis.com/token',
      new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        code,
        grant_type: 'authorization_code',
        redirect_uri: redirectUri,
      }).toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    return response.data;
  } catch (err) {
    throw createHttpError(
      401,
      `Failed to fetch tokens from Google: ${err.message}`
    );
  }
};

export default getGoogleTokens;
