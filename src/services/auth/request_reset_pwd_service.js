import jwt from 'jsonwebtoken';
import path from 'node:path';
import fs from 'node:fs/promises';
import handlebars from 'handlebars';
import createHttpError from 'http-errors';
import User from '../../models/user.js';
import { env } from '../../utils/env.js';
import { TEMPLATES_DIR } from '../../constants/index.js';
// import { sendEmail } from '../../utils/sendMail.js';
import { sendEmail } from '../../utils/send_mail_brevo.js';

/**
 * Sends a password reset email to a user.
 * @param {string} email - User's email address
 * @returns {Promise<void>}
 */
const requestResetPwdService = async email => {
  // Check if the user exists
  const user = await User.findOne({ email });
  if (!user) {
    throw createHttpError(404, 'User not found!');
  }

  // Generate JWT token for password reset
  const resetToken = jwt.sign(
    { sub: user._id, email },
    env('JWT_SECRET'),
    { expiresIn: '15m' } // token expires in 15 minutes
  );

  // Path to the email template
  const resetPasswordTemplatePath = path.join(
    TEMPLATES_DIR,
    'reset_password_email.html'
  );

  // Read and compile the email template
  const templateSource = (
    await fs.readFile(resetPasswordTemplatePath)
  ).toString();
  const template = handlebars.compile(templateSource);

  // Generate HTML with user's name and reset link
  const html = template({
    name: user.name,
    link: `${env('APP_DOMAIN')}/password/reset/${resetToken}`,
  });

  // Send the password reset email
  try {
    await sendEmail({
      to: email,
      subject: 'Reset your password',
      html,
    });
  } catch (error) {
    console.error('Error sending reset password email: ', error);
    throw createHttpError(
      500,
      'Failed to send the email, please try again later.'
    );
  }
};

export default requestResetPwdService;
