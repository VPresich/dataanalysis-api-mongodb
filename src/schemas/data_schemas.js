import Joi from 'joi';

export const dataSchema = Joi.object({
  source_number: Joi.number().required().integer(),
  source_name: Joi.string().max(10).optional().default('dataIMM'),
  file_name: Joi.string().max(100).optional().default('logIMM.txt'),
  source_comment: Joi.string().max(200).optional(),
});

export const sourceNumberSchema = Joi.number()
  .integer()
  .positive()
  .required()
  .messages({
    'number.base': 'Source number must be a number',
    'number.integer': 'Source number must be an integer',
    'number.positive': 'Source number must be greater than zero',
    'any.required': 'Source number is required',
  });
