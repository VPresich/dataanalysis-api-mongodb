import { ctrlWrapper } from '../../utils/ctrl_wrapper.js';
import getAllSourcesService from '../../services/data_sources/get_all_sources_service.js';

/**
 * Controller for retrieving all data sources belonging to the current user.
 *
 * Extracts the user ID from the authenticated request (req.user).
 * Calls the service layer to get all sources for this user.
 * Sends the list of sources in the response.
 */
const getAllSourcesController = ctrlWrapper(async (req, res, next) => {
  const { id } = req.user;
  const sources = await getAllSourcesService(id);
  res.status(200).json(sources);
});

export default getAllSourcesController;
