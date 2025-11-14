import path from 'node:path';
import fs from 'node:fs/promises';
import handlebars from 'handlebars';
import createHttpError from 'http-errors';
import User from '../../models/user.js';
import { sendEmail } from '../../utils/send_mail_brevo.js';
import { TEMPLATES_DIR } from '../../constants/index.js';

/**
 * Sends an email containing a verification or reset token via Brevo. *
 * This function retrieves the user by email, compiles an HTML email template (if available),
 * and sends the email with the provided subject and redirect link.  *
 * @async
 * @function sendToken
 * @param {string} email - Recipient's email address.
 * @param {string} subject - Subject line of the email.
 * @param {string} redirect - The URL link that the user should follow (e.g. verification or password reset link).
 * @param {string} htmlFileName - Name of the HTML file used as the email template.
 * @throws {Error} Throws an error if the user is not found or if sending the email fails.
 * @returns {Promise<void>} Resolves when the email has been successfully sent.
 */
export const sendToken = async (email, subject, redirect, htmlFileName) => {
  // Check if the user exists
  const user = await User.findOne({ email });
  if (!user) {
    throw createHttpError(404, 'User with this email was not found.');
  }

  // Path to the email template
  const emailTemplatePath = path.join(TEMPLATES_DIR, htmlFileName);

  // Read and compile the email template
  const templateSource = await fs.readFile(emailTemplatePath, 'utf-8');
  const template = handlebars.compile(templateSource);
  // Generate HTML content with user data
  const html = template({
    name: user.name || 'User',
    link: redirect,
  });
  // Send the email
  try {
    await sendEmail({
      to: email,
      subject,
      html,
    });
  } catch (err) {
    console.log('ERROR FROM sendEmail:', err.response?.data || err.message);
    throw new Error('Unable to send the email. Please try again later.');
  }
};
