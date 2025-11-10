import createHttpError from 'http-errors';
import DataSource from '../../models/data_source.js';
import Data from '../../models/data.js';

/**
 * Service: Retrieves data for a specific user by source number.
 *
 * @param {string} id - The authenticated user's ID
 * @param {string} sourceNumber - The source number
 * @returns {Promise} - Records of data, or [] if not found
 */
const getDataBySourceService = async ({ id, sourceNumber }) => {
  const source = await DataSource.findOne({
    id_user: id,
    source_number: sourceNumber,
  });

  if (!source) {
    throw createHttpError(404, 'Source not found for this user');
  }

  const dataRecords = await Data.find({ id_source: source._id });

  return dataRecords;
};

export default getDataBySourceService;
