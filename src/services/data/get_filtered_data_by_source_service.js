import createHttpError from 'http-errors';
import Data from '../../models/data.js';
import DataSource from '../../models/data_source.js';

/**
 * Fetch user data filtered by source number and optional time range.
 * @param {Object} params
 * @param {string} params.id - ID of the current user
 * @param {number|string} params.sourceNumber - Source number to filter
 * @param {string|number|Date} [params.startTime] - Optional start time filter
 * @param {string|number|Date} [params.endTime] - Optional end time filter
 * @returns {Promise<Array>} Array of data documents
 */
const getFilteredDataBySourceService = async ({
  id,
  sourceNumber,
  startTime,
  endTime,
}) => {
  const source = await DataSource.findOne({
    id_user: id,
    source_number: parseInt(sourceNumber, 10),
  });

  if (!source) {
    throw createHttpError(404, 'Source not found for this user');
  }

  const queryConditions = { id_source: source._id };

  // Optional time filters
  if (startTime || endTime) {
    queryConditions.Time = {};
    if (startTime) queryConditions.Time.$gte = new Date(startTime);
    if (endTime) queryConditions.Time.$lte = new Date(endTime);
  }

  const dataRecords = await Data.find(queryConditions).sort({ Time: 1 });

  return dataRecords;
};

export default getFilteredDataBySourceService;
