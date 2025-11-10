import { ctrlWrapper } from '../../utils/ctrl_wrapper.js';
import getFilteredDataBySourceService from '../../services/data/get_filtered_data_by_source_service.js';

const getFilteredDataBySourceController = ctrlWrapper(
  async (req, res, next) => {
    const { id } = req.user;
    const { sourceNumber } = req.params;
    const { startTime, endTime } = req.query;

    const dataRecords = await getFilteredDataBySourceService({
      id,
      sourceNumber,
      startTime,
      endTime,
    });

    res.status(200).json(dataRecords);
  }
);

export default getFilteredDataBySourceController;
