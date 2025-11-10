import createHttpError from 'http-errors';
import mongoose from 'mongoose';
import DataSource from '../../models/data_source.js';
import Data from '../../models/data.js';

const deleteAllSourcesAndDataService = async userId => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const sources = await DataSource.find({ id_user: userId }).session(session);

    if (!sources.length) {
      await session.commitTransaction();
      return { deletedSources: 0, deletedData: 0 };
    }

    const sourceIds = sources.map(src => src._id);

    const dataResult = await Data.deleteMany({
      id_source: { $in: sourceIds },
    }).session(session);

    const sourcesResult = await DataSource.deleteMany({
      _id: { $in: sourceIds },
    }).session(session);

    await session.commitTransaction();
    return {
      message: 'Data successfully deleted',
      deletedSources: sourcesResult.deletedCount,
      deletedData: dataResult.deletedCount,
    };
  } catch (err) {
    await session.abortTransaction();
    throw createHttpError(
      500,
      `Failed to delete sources and related data: ${err.message}`
    );
  } finally {
    session.endSession();
  }
};

export default deleteAllSourcesAndDataService;
