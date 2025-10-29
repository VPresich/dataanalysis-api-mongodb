import { ctrlWrapper } from '../../utils/ctrl_wrapper.js';
import { DataAnalysis31 } from '../../models/dataAnalysis.js';

const getAllDataController = ctrlWrapper(async (req, res, next) => {
  const dataRecords = await DataAnalysis31.find({ TrackNum: { $gt: 0 } });
  res.status(200).json(dataRecords);
});

export default getAllDataController;
