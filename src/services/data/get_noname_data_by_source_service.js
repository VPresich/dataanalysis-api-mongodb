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
 */

const getNonameDataBySourceService = async sourceNumber => {
  const nonameId = await User.findOne({
    name: 'noname user',
  });
  if (!nonameId) {
    return [];
  }
  const source = await DataSource.findOne({
    id_user: nonameId._id,
    source_number: parseInt(sourceNumber, 10),
  });
  if (!source) {
    return [];
  }

  return await Data.find({ id_source: source._id });
};

export default getNonameDataBySourceService;
