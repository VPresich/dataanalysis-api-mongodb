import { ctrlWrapper } from '../../utils/ctrl_wrapper.js';
import createHttpError from 'http-errors';
import uploadDataService from '../../services/data/upload_data_service.js';

const uploadDataController = ctrlWrapper(async (req, res, next) => {
  const { id } = req.user;
  const { datafile } = req.file;
  const {
    source_number,
    source_name = 'dataIMM',
    file_name = '',
    source_comments = '',
  } = req.body;

  if (!id) return next(createHttpError(401, 'Unauthorized'));
  if (!datafile) return next(createHttpError(400, 'File is required'));
  if (!source_number) return next(createHttpError(400, 'Missing fields'));

  const sNumber = Number(source_number);
  if (!Number.isFinite(sNumber)) {
    return next(createHttpError(400, 'Invalid source_number'));
  }

  const result = await uploadDataService({
    id,
    source_number: sNumber,
    source_name,
    file_name,
    source_comments,
    fileObj: datafile,
  });

  res.status(201).json(result);
});

export default uploadDataController;

// if (err.code === 11000) {
//   return next(
//     createHttpError(409, 'number_source must be unique for this user')
//   );
// }
