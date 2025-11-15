import resetPwdService from '../../services/auth/reset_pwd_service.js';

const resetPwdController = async (req, res) => {
  const { password, token } = req.body;

  await resetPwdService(password, token);

  res.status(200).json({
    message: 'Password changed successfully!',
    data: {},
  });
};

export default resetPwdController;
