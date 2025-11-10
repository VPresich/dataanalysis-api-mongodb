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

  try {
    await session.withTransaction(async () => {
      const source = await DataSource.findOne({
        id_user: id,
        source_number: Number(sourceNumber),
      }).session(session);

      if (!source) {
        throw createHttpError(
          404,
          `Source with number ${sourceNumber} not found`
        );
      }

      await Data.deleteMany({ id_source: source._id }).session(session);

      const deletedSource = await DataSource.findByIdAndDelete(
        source._id
      ).session(session);

      session.deletedResult = {
        message: `Source ${sourceNumber} and all related data have been successfully deleted.`,
        deletedSource,
      };
    });

    return session.deletedResult;
  } catch (error) {
    throw error instanceof Error
      ? error
      : createHttpError(500, 'An unknown error occurred while deleting data.');
  } finally {
    session.endSession();
  }
};

export default deleteDataBySourceService;
