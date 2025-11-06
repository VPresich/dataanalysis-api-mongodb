import createHttpError from 'http-errors';
/**
 * Middleware for validating the request body using a Joi schema.
 *
 * @param {Joi.Schema} schema - Joi validation schema that defines the expected body structure.
 * @returns {Function} Express middleware function.
 */
const validateBody = schema => {
  const func = (req, _, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(createHttpError(400, error.message));
    }
    next();
  };

  return func;
};

export default validateBody;
