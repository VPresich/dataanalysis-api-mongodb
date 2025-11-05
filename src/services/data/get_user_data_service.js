import Data from '../../models/data.js';

/**
 * Fetch user data filtered by source number and optional time range.
 * @param {string} userId - ID of the current user
 * @param {number} sourceNumber - Source number to filter
 * @param {string} [startTime] - Optional start time filter
 * @param {string} [endTime] - Optional end time filter
 * @returns {Promise<Array>} Array of data documents
 */
export const getUserDataService = async (
  userId,
  sourceNumber,
  startTime,
  endTime
) => {
  const queryConditions = {
    id_user: userId,
    source_number: sourceNumber,
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

  return await Data.find(queryConditions);
};
