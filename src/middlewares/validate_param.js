import createHttpError from 'http-errors';

/**
 * Universal middleware factory for validating route parameters (req.params).
 *
 * @param {Joi.Schema} schema - Joi schema used to validate the parameter.
 * @param {string} paramName - The name of the parameter to validate (e.g., "number").
 * @returns {Function} Express middleware that validates the specified route parameter.
 *
 * The returned middleware:
 * - Extracts the parameter value from req.params[paramName].
 * - Validates it against the provided Joi schema.
 * - If validation fails, passes a 400 Bad Request error to the next middleware.
 * - If validation succeeds, calls next() to continue the request pipeline.
 */
const validateParam = (schema, paramName) => {
  return (req, _, next) => {
    const value = req.params[paramName];
    const { error } = schema.validate(value);

    if (error) {
      return next(createHttpError(400, error.message));
    }

    next();
  };
};

export default validateParam;
