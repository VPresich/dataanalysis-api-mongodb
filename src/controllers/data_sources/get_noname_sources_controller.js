import { ctrlWrapper } from '../../utils/ctrl_wrapper.js';
import getNonameSourcesService from '../../services/data_sources/get_noname_sources_service.js';

/**
 * Controller: Get noname user sources.
 * Delegates logic to the service layer.
 * Returns the sources.
 */
const getNonameSourcesController = ctrlWrapper(async (req, res) => {
  const result = await getNonameSourcesService();
  res.status(200).json(result);
});

export default getNonameSourcesController;
