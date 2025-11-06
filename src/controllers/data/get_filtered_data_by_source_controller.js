import { ctrlWrapper } from '../../utils/ctrl_wrapper.js';
import getFilteredDataBySourceService from '../../services/data/get_filtered_data_by_source_service.js';

const getFilteredDataBySourceController = ctrlWrapper(
  async (req, res, next) => {
    const { id } = req.user; // current user's ID
    const { number } = req.params;
    const { startTime, endTime } = req.query;

    // Call the service to get data
    const dataRecords = await getFilteredDataBySourceService({
      id,
      number,
      startTime,
      endTime,
    });

    res.status(200).json(dataRecords);
  }
);

export default getFilteredDataBySourceController;
