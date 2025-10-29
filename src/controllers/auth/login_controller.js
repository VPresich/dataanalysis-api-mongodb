// import createHttpError from 'http-errors';
// import jwt from 'jsonwebtoken';
// import bcrypt from 'bcrypt';
// import User from '../../models/user.js';
// import { ctrlWrapper } from '../../utils/ctrl_wrapper.js';
// import { DEF_THEME } from '../../constants/index.js';

// /**
//  * Login controller
//  *
//  * 1. Finds the user by email.
//  * 2. (Optional) Checks if the account is verified.
//  * 3. Compares passwords using bcrypt.
//  * 4. Generates JWT token and saves it in the user document.
//  * 5. Returns token and basic user data.
//  */
// const loginController = ctrlWrapper(async (req, res, next) => {
//   const { email, password } = req.body;
//   const emailInLowerCase = email.toLowerCase();

//   // Find user by email
//   const user = await User.findOne({ email: emailInLowerCase });
//   if (!user) {
//     throw createHttpError(401, 'Email or password is wrong');
//   }

//   // Uncomment if account verification is needed
//   // if (!user.verify) {
//   //   throw createHttpError(401, 'Your account is not verified');
//   // }

//   // Compare passwords
//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) {
//     throw createHttpError(401, 'Email or password is wrong');
//   }

//   // Generate JWT token
//   const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//     expiresIn: '24h',
//   });

//   // Save token in user document
//   user.token = token;
//   await user.save();

//   // Return user info with token
//   res.status(200).json({
//     token,
//     user: {
//       name: user.name,
//       email: user.email,
//       avatarURL: user.avatarURL,
//       theme: user.theme || DEF_THEME,
//     },
//   });
// });

// export default loginController;

import { ctrlWrapper } from '../../utils/ctrl_wrapper.js';
import { loginService } from '../../services/auth/login_service.js';

/**
 * Login controller
 *
 * Receives credentials from the client,
 * calls the login service,
 * and returns a JSON response with token and user data.
 */
const loginController = ctrlWrapper(async (req, res) => {
  const { email, password } = req.body;
  const result = await loginService(email, password);
  res.status(200).json(result);
});

export default loginController;
