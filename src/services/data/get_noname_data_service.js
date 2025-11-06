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
 * 2. Retrieves all data sources associated with this user, sorted by creation date (newest first).
 * 3. Fetches all data records linked to the latest source.
 * 4. Returns both the source and the corresponding data records.
 *
 * If the noname user, sources, or data records are missing,
 * the function returns empty array instead of throwing an error.
 *
 * @async
 * @function getNonameDataService
 * @returns {Promise<Object>} - Object containing:
 *   - {Array} sources - List of all "noname" user's sources (may be empty).
 *   - {Object} source - The latest source details.
 *   - {Array} data - Data records associated with the latest source (may be empty).
 */

const getNonameDataService = async () => {
  const nonameId = await User.findOne({
    name: 'noname user',
  });
  if (!nonameId)
    return {
      sources: [],
      data: [],
    };

  const nonameSources = await DataSource.find({ id_user: nonameId }).sort({
    createdAt: -1,
  });
  if (!nonameSources.length)
    return {
      sources: [],
      data: [],
    };
  const firstSourceId = nonameSources[0]._id;

  const nonameData = await Data.find({ id_source: firstSourceId });

  return nonameData;
};

export default getNonameDataService;
