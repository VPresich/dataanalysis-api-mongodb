import createHttpError from 'http-errors';
import { parseAndSaveCsv } from './parser_csv.js';
import DataSource from '../../models/data_source.js';
import User from '../../models/user.js';

const uploadDataService = async ({
  id,
  source_number,
  source_name,
  file_name,
  source_comment,
  fileObj,
}) => {
  const user = await User.findById(id);
  if (!user) throw createHttpError(401, 'Unauthorized');

  const existingSource = await DataSource.findOne({
    id_user: id,
    source_number,
  });
  if (existingSource)
    throw createHttpError(400, 'Source with this number already exists');

  const dataSource = new DataSource({
    id_user: id,
    source_number,
    source_name,
    file_name,
    source_comment,
  });
  await dataSource.save();

  try {
    const result = await parseAndSaveCsv(fileObj, dataSource);
    return result;
  } catch {
    throw createHttpError(500, 'Error in parser CSV file');
  }
};

export default uploadDataService;
