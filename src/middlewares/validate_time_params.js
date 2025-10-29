import createHttpError from 'http-errors';

const validateTimeParams = (req, _res, next) => {
  const { startTime, endTime } = req.query;

  if (startTime && isNaN(startTime)) {
    return next(
      createHttpError(400, 'Invalid startTime. It must be a number.')
    );
  }

  if (endTime && isNaN(endTime)) {
    return next(createHttpError(400, 'Invalid endTime. It must be a number.'));
  }

  if (startTime && endTime && parseFloat(startTime) > parseFloat(endTime)) {
    return next(
      createHttpError(400, 'startTime must be less than or equal to endTime.')
    );
  }

  next();
};

export default validateTimeParams;
