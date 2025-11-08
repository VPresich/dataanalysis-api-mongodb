import createHttpError from 'http-errors';
import DataSource from '../../models/data_source.js';
import Data from '../../models/data.js';

/**
 * Deletes all sources and their related data for a given user within a MongoDB transaction.
 * Ensures data consistency — if any deletion fails, all changes are rolled back.
 *
 * @param {string} userId - The ID of the user whose sources and data should be deleted.
 * @returns {Promise<{deletedSources: number, deletedData: number}>} Summary of deleted records.
 * @throws {HttpError} 500 - If the deletion process fails.
 */

const deleteAllSourcesAndDataService = async userId => {
  const session = await DataSource.startSession();
  session.startTransaction();

  try {
    const sources = await DataSource.find({ id_user: userId }).session(session);

    if (!sources.length) {
      await session.commitTransaction();
      session.endSession();
      return { deletedSources: 0, deletedData: 0 };
    }

    const sourceIds = sources.map(src => src._id);

    await Data.deleteMany({
      source_id: { $in: sourceIds },
    }).session(session);

    await DataSource.deleteMany({
      _id: { $in: sourceIds },
    }).session(session);

    await session.commitTransaction();
    session.endSession();

    return {
      message: 'Data successfully deleted',
    };
  } catch {
    await session.abortTransaction();
    session.endSession();
    throw createHttpError(500, 'Failed to delete sources and related data');
  }
};

export default deleteAllSourcesAndDataService;
