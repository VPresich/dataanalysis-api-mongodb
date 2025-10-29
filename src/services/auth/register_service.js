import bcrypt from 'bcrypt';
import crypto from 'node:crypto';
import jwt from 'jsonwebtoken';
import createHttpError from 'http-errors';
import User from '../../models/user.js';
import { PATH_DEF_LIGHT_AVATAR, DEF_THEME } from '../../constants/index.js';
// import sendVerificationToken from '../../helpers/sendVerificationToken.js';

const registerService = async ({ name, email, password }) => {
  const emailInLowerCase = email.toLowerCase();

  // Check if the user already exists
  const existingUser = await User.findOne({ email: emailInLowerCase });
  if (existingUser) {
    throw createHttpError(409, 'Email in use');
  }

  // Hash the password
  const hashPassword = await bcrypt.hash(password, 10);

  const avatarURL = PATH_DEF_LIGHT_AVATAR;
  const verificationToken = crypto.randomUUID();

  // Create a new user
  const newUser = await User.create({
    name,
    email: emailInLowerCase,
    password: hashPassword,
    avatarURL,
    verificationToken, // store verification token for email verification
    verify: false, // user not verified yet
    theme: DEF_THEME, // default theme
    token: null, // JWT token will be added later
  });

  // -----------------------------
  // Optional: Send verification email
  // await sendVerificationToken(emailInLowerCase, verificationToken);
  // -----------------------------

  // Generate JWT token
  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: '24h',
  });

  // Save the token in the user document
  newUser.token = token;
  await newUser.save();

  // Return token and user info
  return {
    token,
    user: {
      name: newUser.name,
      email: newUser.email,
      avatarURL: newUser.avatarURL,
      theme: newUser.theme,
    },
  };
};

export default registerService;
