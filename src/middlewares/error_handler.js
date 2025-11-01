import { HttpError } from 'http-errors';

export const errorHandler = (err, _req, res, _next) => {
  const status = err instanceof HttpError ? err.status : 500;
  const message =
    err instanceof HttpError ? err.message : 'Something went wrong';

  res.status(status).json({
    status,
    message,
    data: null,
    timestamp: new Date().toISOString(),
  });
};
