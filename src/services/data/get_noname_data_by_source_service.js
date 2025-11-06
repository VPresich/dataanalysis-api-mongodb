import DataSource from '../../models/data_source.js';
import Data from '../../models/data.js';
import User from '../../models/user.js';

/**
 * Service: Retrieves demo data for the "noname user".
 *
 * This service is used to display example data for users who are not registered or logged in.
 * It fetches the default (noname) user's data records.
 *
 * Logic:
 * 1. Finds the "noname user" in the users collection.
 * 2. Finds the source id by source number.
 * 3. Fetches all data records linked to the source.
 * 4. Returns the corresponding data records.
 *
 * If the noname user, source, or data records are missing,
 * the function returns empty array instead of throwing an error.
 *
 * @async
 * @function getNonameDataService
 * @returns {Promise<Object>} - Object containing:
 *   - {Array} sources - List of all "noname" user's sources (may be empty).
 *   - {Object} source - The latest source details.
 *   - {Array} data - Data records associated with the latest source (may be empty).
 */

const getNonameDataBySourceService = async number => {
  const nonameId = await User.findOne({
    name: 'noname user',
  });
  if (!nonameId) return [];

  const sourceId = await DataSource.findOne({ source_number: number });
  if (!sourceId) return [];

  return await Data.find({ id_source: sourceId._id });
};

export default getNonameDataBySourceService;
