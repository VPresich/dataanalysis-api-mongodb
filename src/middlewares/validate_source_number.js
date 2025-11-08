export const validateSourceNumber = (req, res, next) => {
  const { sourceNumber } = req.params;

  if (!sourceNumber) {
    return res.status(400).json({ message: 'Source number is required' });
  }

  const parsedNumber = Number(sourceNumber);
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
