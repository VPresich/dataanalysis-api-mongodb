import DataSource from '../../models/data_source.js';
import User from '../../models/user.js';

/**
 * Service: Retrieves demo sources for the "noname user".
 *
 * This service is used to display example data for users who are not registered or logged in.
 * It fetches the default (noname) user's sources.
 *
 * Logic:
 * Finds the "noname user" in the users collection.
 * Retrieves all sources associated with this user, sorted by creation date (newest first).
 * Returns sources list.
 *
 * If the noname user, sources are missing,
 * the function returns empty arrays instead of throwing an error.
 *
 */

const getNonameSourcesService = async () => {
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

  return nonameSources;
};

export default getNonameSourcesService;
