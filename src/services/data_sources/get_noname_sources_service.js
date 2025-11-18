import DataSource from '../../models/data_source.js';
import User from '../../models/user.js';

/**
 * Service: Retrieves demo sources for the "noname user".
 * This service provides example data for users who are not registered or not logged in.
 * It fetches the default ("noname") user's sources from the database.
 *
 * Finds the "noname user" in the users collection.
 * Retrieves all sources associated with this user, sorted by creation date (newest first).
 * Returns the list of sources.
 *
 *  If the "noname user" does not exist, or the user has no sources,
 *  the function returns an empty array instead of throwing an error.
 */
const getNonameSourcesService = async () => {
  const nonameUser = await User.findOne({ name: 'noname user' });
  if (!nonameUser) return [];

  const nonameSources = await DataSource.find({ id_user: nonameUser._id }).sort(
    {
      createdAt: -1,
    }
  );

  return nonameSources;
};

export default getNonameSourcesService;
