import queryString from 'query-string';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { URL } from 'url';
import User from '../../models/user.js';
import Theme from '../../models/theme.js';
import Token from '../../models/token.js';
import { PATH_DEF_LIGHT_AVATAR, DEF_THEME } from '../../constants/index.js';
import { ctrlWrapper } from '../../utils/ctrl_wrapper.js';
import { env } from '../../utils/env.js';

const googleRedirectController = ctrlWrapper(async (req, res, next) => {
  const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;

  const urlObj = new URL(fullUrl);
  const urlParams = queryString.parse(urlObj.search);
  const code = urlParams.code;
  const app = urlParams.state || 'teachers';
  const tokenResponse = await axios({
    url: 'https://oauth2.googleapis.com/token',
    method: 'post',
    data: {
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: `${process.env.BACKEND_BASE_URL}/users/google-redirect`,
      grant_type: 'authorization_code',
      code: code,
    },
  });
  const { access_token } = tokenResponse.data;

  const userDataResponse = await axios({
    url: 'https://www.googleapis.com/oauth2/v2/userinfo',
    method: 'get',
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  const { id, name, email } = userDataResponse.data;
  const emailInLowerCase = email.toLowerCase();

  const frontEndURL = env('FRONTEND_BASE_URL');

  let user = await User.findOne({ googleId: id });

  if (!user) {
    user = await User.findOne({ email: emailInLowerCase });

    if (user) {
      if (!user.googleId) {
        user.googleId = id;
        await user.save();
      } else {
        return res.redirect(frontEndURL);
      }
    } else {
      const hashPassword = await bcrypt.hash('random_password', 10);
      user = new User({
        name,
        email: emailInLowerCase,
        password: hashPassword,
        googleId: id,
        avatarURL: PATH_DEF_LIGHT_AVATAR,
        verificationToken: 'verified',
        verify: true,
      });

      await user.save();
    }
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '24h',
  });

  user.token = token;
  await user.save();

  let userToken = await Token.findOne({ user: user._id, app });
  if (userToken) {
    userToken.token = token;
    await userToken.save();
  } else {
    await Token.create({ user: user._id, app, token });
  }

  let theme = await Theme.findOne({ user: user._id, app });

  if (!theme) {
    theme = await Theme.create({ user: user._id, app, color: DEF_THEME });
  }

  return res.redirect(`${frontEndURL}?token=${token}`);
});

export default googleRedirectController;
