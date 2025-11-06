export const validateSourceNumber = (req, res, next) => {
  const { number } = req.params;

  if (!number) {
    return res.status(400).json({ message: 'Source number is required' });
  }

  const parsedNumber = Number(number);
  if (isNaN(parsedNumber)) {
    return res.status(400).json({ message: 'Source number must be a number' });
  }

  if (!Number.isInteger(parsedNumber) || parsedNumber <= 0) {
    return res
      .status(400)
      .json({ message: 'Source number must be a positive integer' });
  }

  next();
};
