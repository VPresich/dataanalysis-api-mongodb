import bcrypt from 'bcrypt';
import crypto from 'node:crypto';
import jwt from 'jsonwebtoken';
import createHttpError from 'http-errors';
import { env } from '../../utils/env.js';
import User from '../../models/user.js';
import { PATH_DEF_AVATAR, DEF_THEME } from '../../constants/index.js';
import { sendToken } from './send_token.js';

const registerService = async ({ name, email, password }) => {
  const emailInLowerCase = email.toLowerCase();

  // Check if the user already exists
  const existingUser = await User.findOne({ email: emailInLowerCase });
  if (existingUser) {
    throw createHttpError(
      409,
      'Email is already in use. Please log in instead.'
    );
  }

  // Hash the password
  const hashPassword = await bcrypt.hash(password, 10);

  const avatarURL = PATH_DEF_AVATAR;

  const requireVerification = env('REQUIRE_EMAIL_VERIFICATION') === 'true';
  const verificationToken = requireVerification ? crypto.randomUUID() : null;
  const verifyStatus = !requireVerification;

  // Create a new user
  const newUser = await User.create({
    name,
    email: emailInLowerCase,
    password: hashPassword,
    avatarURL,
    verificationToken,
    verify: verifyStatus,
    theme: DEF_THEME,
    token: null,
  });

  if (requireVerification) {
    let emailSent = false;

    try {
      const link = `${env(
        'BACKEND_BASE_URL'
      )}/auth/verify/${verificationToken}`;
      await sendToken(
        email.toLowerCase(),
        'Verify your email address',
        link,
        'verification_email.html'
      );
    } catch (err) {
      console.error('Failed to send verification email:', err.message);
    }

    return {
      verifyRequired: true,
      user: {
        name: newUser.name,
        email: newUser.email,
      },
      message: emailSent
        ? 'Verification email sent. Please check your inbox.'
        : 'Verification email could not be sent. You may need to verify your email manually.',
    };
  }

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
    verifyRequired: false,
    user: {
      name: newUser.name,
      email: newUser.email,
      avatarURL: newUser.avatarURL,
      theme: newUser.theme,
    },
  };
};

export default registerService;
