import requestResetPwdService from '../../services/auth/request_reset_pwd_service.js';

const requestResetPwdController = async (req, res) => {
  const { email } = req.body;

  await requestResetPwdService(email);

  res.json({
    status: 200,
    message: 'Reset password email has been successfully sent.',
    data: {},
  });
};

export default requestResetPwdController;
