import { ctrlWrapper } from '../../utils/ctrl_wrapper.js';
import deleteDataBySourceService from '../../services/data_sources/delete_data_by_source_service.js';

const deleteDataBySourceController = ctrlWrapper(async (req, res) => {
  const { id } = req.user;
  const { sourceNumber } = req.params;

  const result = await deleteDataBySourceService({ id, sourceNumber });

  res.status(200).json(result);
});

export default deleteDataBySourceController;
