import { ctrlWrapper } from '../../utils/ctrl_wrapper.js';
import getNonameDataService from '../../services/data/get_noname_data_service.js';

/**
 * Controller: Get noname user data of recent source
 * Delegates logic to the service layer.
 * Returns the data records.
 */
const getNonameDataController = ctrlWrapper(async (req, res) => {
  const result = await getNonameDataService();
  res.status(200).json(result);
});

export default getNonameDataController;
