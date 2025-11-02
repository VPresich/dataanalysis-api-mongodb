import path from 'node:path';
import fs from 'node:fs/promises';
import handlebars from 'handlebars';
import createHttpError from 'http-errors';
import User from '../../models/user.js';
import { sendEmail } from '../../utils/send_mail_brevo.js';
import { TEMPLATES_DIR } from '../../constants/index.js';
import { env } from '../../utils/env.js';

/**
 * Sends a verification email via Brevo
 * @param {string} email - recipient's email address
 * @param {string} verificationToken - token used to verify the user's email
 */
const sendVerificationToken = async (email, verificationToken) => {
  //Check user
  const user = await User.findOne({ email });
  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  // Path to the verification email template
  const verificationEmailTemplatePath = path.join(
    TEMPLATES_DIR,
    'verification_email.html'
  );

  // Read and compile the email template
  const templateSource = (
    await fs.readFile(verificationEmailTemplatePath)
  ).toString();
  const template = handlebars.compile(templateSource);

  // Generate HTML with user's name and verification link
  const html = template({
    name: user.name,
    link: `${env('BACKEND_BASE_URL')}/auth/verify/${verificationToken}`,
  });

  try {
    await sendEmail({
      to: email,
      subject: 'Welcome!',
      html,
    });
    console.log('Verification email sent via Brevo!');
  } catch (err) {
    console.error(
      'Failed to send verification email via Brevo:',
      err.response?.data || err.message
    );
    throw new Error('Failed to send verification email via Brevo');
  }
};

export default sendVerificationToken;
