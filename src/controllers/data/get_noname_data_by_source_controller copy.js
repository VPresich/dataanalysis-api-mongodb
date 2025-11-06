import { ctrlWrapper } from '../../utils/ctrl_wrapper.js';
import getNonameDataBySourceService from '../../services/data/get_noname_data_service.js';

/**
 * Controller: Get noname user data of source number
 * Delegates logic to the service layer.
 * Returns the data records.
 */
const getNonameDataBySourceController = ctrlWrapper(async (req, res) => {
  const { number } = req.params;
  const result = await getNonameDataBySourceService(number);
  res.status(200).json(result);
});

export default getNonameDataBySourceController;
