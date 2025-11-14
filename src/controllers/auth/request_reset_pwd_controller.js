import requestResetPwdService from '../../services/auth/request_reset_pwd_service.js';

const requestResetPwdController = async (req, res) => {
  const { email } = req.body;

  await requestResetPwdService(email);

  res.status(200).json({
    message:
      'If an account with this email exists, a password reset link has been sent. Please check your inbox and follow the instructions to reset your password.',
    data: {},
  });
};

export default requestResetPwdController;
