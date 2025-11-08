import { ctrlWrapper } from '../../utils/ctrl_wrapper.js';
import getDataBySourceService from '../../services/data/get_data_by_source_service.js';

/**
 * Controller: Get user-specific source and its records by source number
 *
 * Extracts user Ii from the authenticated request.
 * Extracts source number from request parameters.
 * Delegates logic to the service layer.
 * Returns the combined source and data records.
 */
const getDataBySourceController = ctrlWrapper(async (req, res) => {
  const { id } = req.user;
  const { sourceNumber } = req.params;

  const result = await getDataBySourceService({ id, sourceNumber });

  res.status(200).json(result);
});

export default getDataBySourceController;
