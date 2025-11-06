import { ctrlWrapper } from '../../utils/ctrl_wrapper.js';
import deleteDataBySourceService from '../../services/data/delete_data_by_source_service.js';

const deleteDataBySourceController = ctrlWrapper(async (req, res) => {
  const { id } = req.user;
  const { number } = req.params;

  const result = await deleteDataBySourceService({ id, number });

  res.status(204).json(result);
});

export default deleteDataBySourceController;
