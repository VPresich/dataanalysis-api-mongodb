// import queryString from 'query-string';
// import axios from 'axios';
// import jwt from 'jsonwebtoken';
// import bcrypt from 'bcrypt';
// import { URL } from 'url';
// import User from '../../models/user.js';
// import { PATH_DEF_LIGHT_AVATAR } from '../../constants/index.js';
// import { ctrlWrapper } from '../../utils/ctrl_wrapper.js';
// import { env } from '../../utils/env.js';

// /**
//  * Google OAuth redirect controller.
//  *
//  * 1. Receives the authorization code from Google.
//  * 2. Exchanges the code for access token.
//  * 3. Fetches user info from Google.
//  * 4. Finds or creates a user in the `User` collection.
//  * 5. Generates JWT token and saves it directly in the user document.
//  * 6. Redirects to frontend with token as query parameter.
//  */
// const googleRedirectController = ctrlWrapper(async (req, res, next) => {
//   const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
//   const urlObj = new URL(fullUrl);
//   const urlParams = queryString.parse(urlObj.search);
//   const code = urlParams.code;

//   const frontEndURL = env('FRONTEND_BASE_URL');

//   // Exchange authorization code for access token
//   const tokenResponse = await axios.post(
//     'https://oauth2.googleapis.com/token',
//     {
//       client_id: process.env.GOOGLE_CLIENT_ID,
//       client_secret: process.env.GOOGLE_CLIENT_SECRET,
//       redirect_uri: `${process.env.BACKEND_BASE_URL}/auth/google-redirect`,
//       grant_type: 'authorization_code',
//       code,
//     }
//   );

//   const { access_token } = tokenResponse.data;

//   // Fetch user info from Google
//   const userDataResponse = await axios.get(
//     'https://www.googleapis.com/oauth2/v2/userinfo',
//     {
//       headers: { Authorization: `Bearer ${access_token}` },
//     }
//   );

//   const { id: googleId, name, email } = userDataResponse.data;
//   const emailInLowerCase = email.toLowerCase();

//   // Find existing user by Google ID or email
//   let user = await User.findOne({ googleId });
//   if (!user) {
//     user = await User.findOne({ email: emailInLowerCase });

//     if (user) {
//       // If user exists but doesn't have Google ID yet, update it
//       if (!user.googleId) {
//         user.googleId = googleId;
//         await user.save();
//       } else {
//         return res.redirect(frontEndURL);
//       }
//     } else {
//       // Create new user in Users table
//       const hashPassword = await bcrypt.hash('random_password', 10);
//       user = new User({
//         name,
//         email: emailInLowerCase,
//         password: hashPassword,
//         googleId,
//         avatarURL: PATH_DEF_LIGHT_AVATAR,
//         verificationToken: 'verified',
//         verify: true,
//       });

//       await user.save();
//     }
//   }

//   // Generate JWT token and save directly in user document
//   const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//     expiresIn: '24h',
//   });
//   user.token = token;
//   await user.save();

//   // Redirect to frontend with token
//   return res.redirect(`${frontEndURL}?token=${token}`);
// });

// export default googleRedirectController;

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
