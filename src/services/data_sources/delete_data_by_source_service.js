import createHttpError from 'http-errors';
import mongoose from 'mongoose';
import Data from '../../models/data.js';
import DataSource from '../../models/data_source.js';

/**
 * Deletes all user data from the Data collection by a given source number.
 * Uses a transaction to ensure both Data and DataSource are deleted atomically.
 */
const deleteDataBySourceService = async ({ id, sourceNumber }) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const source = await DataSource.findOne({
      id_user: id,
      source_number: sourceNumber,
    }).session(session);

    if (!source) {
      throw createHttpError(
        404,
        `Source with number ${sourceNumber} not found`
      );
    }

    await Data.deleteMany({
      id_source: source._id,
    }).session(session);

    const deletedSource = await DataSource.deleteOne({
      _id: source._id,
    }).session(session);

    await session.commitTransaction();
    session.endSession();

    return {
      message: 'Data successfully deleted',
      deletedSource,
    };
  } catch {
    await session.abortTransaction();
    session.endSession();
    throw createHttpError(500, 'Failed to delete data and source');
  }
};

export default deleteDataBySourceService;
