export const errorHandler = (err, _req, res, _next) => {
  // If the error has a "status" property, treat it as an HTTP-like error
  if (err && err.status) {
    res.status(err.status).json({
      status: err.status,
      message: err.message || err.name || 'Error',
      data: err,
    });
    return;
  }

  // All other errors are treated as internal server errors
  res.status(500).json({
    status: 500,
    message: err.message || 'Something went wrong',
    data: err,
  });
};
