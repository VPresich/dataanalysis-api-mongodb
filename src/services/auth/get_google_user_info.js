import axios from 'axios';
import createHttpError from 'http-errors';

/**
 * Get user info from Google using access token.
 *
 * @param {string} accessToken - OAuth access token from Google
 * @returns {Promise<Object>} - Google user info (email, name, etc.)
 * @throws {HttpError} - Throws 401 if fetching user info fails
 */
const getGoogleUserInfo = async accessToken => {
  try {
    const response = await axios.get(
      'https://www.googleapis.com/oauth2/v2/userinfo',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (err) {
    throw createHttpError(
      401,
      `Failed to fetch user info from Google: ${err.message}`
    );
  }
};

export default getGoogleUserInfo;
