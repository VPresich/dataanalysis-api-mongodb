import { ctrlWrapper } from '../../utils/ctrl_wrapper.js';
import createHttpError from 'http-errors';
import updateSourceService from '../../services/data_sources/update_source_service.js';

const updateSourceController = ctrlWrapper(async (req, res, next) => {
  const { id } = req.user;
  const { sourceNumber } = req.params;

  if (!id) return next(createHttpError(401, 'Unauthorized'));
  if (!sourceNumber) return next(createHttpError(400, 'Missing source number'));

  const result = await updateSourceService({
    id,
    source_number: sourceNumber,
    source_name: req.body.source_name,
    file_name: req.body.file_name,
    comment: req.body.comment,
  });

  res.status(200).json(result);
});

export default updateSourceController;
