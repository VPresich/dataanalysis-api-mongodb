import createHttpError from 'http-errors';
import Data from '../../models/data.js';
import DataSource from '../../models/data_source.js';

/**
 * Fetch user data filtered by source number and optional time range.
 * @param {string} userId - ID of the current user
 * @param {number} sourceNumber - Source number to filter
 * @param {string} [startTime] - Optional start time filter
 * @param {string} [endTime] - Optional end time filter
 * @returns {Promise<Array>} Array of data documents
 */
const getFilteredDataBySourceService = async ({
  id,
  number,
  startTime,
  endTime,
}) => {
  const source = await DataSource.findOne({
    id_user: id,
    source_number: parseInt(number, 10),
  });

  if (!source) {
    throw createHttpError(404, 'Source not found for this user');
  }
  const queryConditions = {
    id_source: source._id,
  };

  // Optional time filters
  if (startTime && endTime) {
    queryConditions.Time = {
      $gte: parseFloat(startTime),
      $lte: parseFloat(endTime),
    };
  } else if (startTime) {
    queryConditions.Time = { $gte: parseFloat(startTime) };
  } else if (endTime) {
    queryConditions.Time = { $lte: parseFloat(endTime) };
  }

  const dataRecords = await Data.find(queryConditions);
  return dataRecords;
};

export default getFilteredDataBySourceService;
