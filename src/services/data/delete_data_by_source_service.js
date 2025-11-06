import createHttpError from 'http-errors';
import Data from '../../models/data.js';
import DataSource from '../../models/data_source.js';
/**
 * Deletes all user data from the Data collection by a given source number.
 * The function verifies that the specified data source belongs to the user
 * before deleting both the data entries and the data source record itself.
 *
 * @async
 * @function deleteUserDataBySource
 * @param {Object} params - The function parameters.
 * @param {string} params.id - The user's ID.
 * @param {number|string} params.source_number - The source number to identify the data source.
 * @returns {Promise<Object>} An object containing deletion summary:
 */

const deleteDataBySourceService = async ({ id, number }) => {
  const source = await DataSource.findOne({
    id_user: id,
    source_number: number,
  });

  if (!source) {
    throw createHttpError(404, `Source with number ${number} not found`);
  }

  const deleteResult = await Data.deleteMany({ id_source: source._id });

  await DataSource.deleteOne({ _id: source._id });

  return {
    message: 'Data successfully deleted',
    deletedCount: deleteResult,
  };
};

export default deleteDataBySourceService;
