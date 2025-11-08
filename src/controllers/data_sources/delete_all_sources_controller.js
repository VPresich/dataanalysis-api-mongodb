import { ctrlWrapper } from '../../utils/ctrl_wrapper.js';
import deleteAllSourcesAndDataService from '../../services/data_sources/delete_all_sources_service.js';

/**
 * Controller for delete all data and sources belonging to the current user.
 *
 * Extracts the user ID from the authenticated request (req.user).
 * Calls the service layer to get all sources for this user.
 * Sends the list of sources in the response.
 */
const deleteAllSourcesAndDataController = ctrlWrapper(
  async (req, res, next) => {
    const { id } = req.user;
    await deleteAllSourcesAndDataService(id);
    res.status(204);
  }
);

export default deleteAllSourcesAndDataController;
