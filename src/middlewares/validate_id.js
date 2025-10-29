import createHttpError from 'http-errors';

const validateId = schema => {
  const func = (req, _, next) => {
    const { error } = schema.validate(req.params.id);
    if (error) {
      next(createHttpError(400, error.message));
    }
    next();
  };
  return func;
};

export default validateId;
