import requestResetEmailService from '../../services/auth/request_reset_email_service.js';

const requestResetEmailController = async (req, res) => {
  const { email } = req.body;

  await requestResetEmailService(email);

  res.json({
    status: 200,
    message: 'Reset password email has been successfully sent.',
    data: {},
  });
};

export default requestResetEmailController;
