import createHttpError from 'http-errors';
import { parseAndSaveCsv } from './parser_csv.js';
import DataSource from '../../models/data_source.js';
import User from '../../models/user.js';
import mongoose from 'mongoose';

const uploadDataService = async ({
  id,
  source_number,
  source_name,
  file_name,
  source_comment,
  fileObj,
}) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const user = await User.findById(id).session(session);
    if (!user) throw createHttpError(401, 'Unauthorized');

    const existingSource = await DataSource.findOne({
      id_user: id,
      source_number,
    }).session(session);

    if (existingSource) {
      throw createHttpError(400, 'Source with this number already exists');
    }

    const dataSource = new DataSource({
      id_user: id,
      source_number,
      source_name,
      file_name,
      source_comment,
    });

    await dataSource.save({ session });

    const resultParser = await parseAndSaveCsv(fileObj, dataSource, session);

    await session.commitTransaction();
    session.endSession();

    return {
      ...resultParser,
      dataSource,
    };
  } catch {
    await session.abortTransaction();
    session.endSession();
    throw createHttpError(500, 'Error uploading and parsing CSV file');
  }
};

export default uploadDataService;
