import {
  DataAnalysis10,
  DataAnalysis11,
  DataAnalysis12,
  DataAnalysis13,
  DataAnalysis14,
  DataAnalysis15,
  DataAnalysis16,
  DataAnalysis17,
  DataAnalysis18,
} from '../../models/dataAnalysis.js';

import { ctrlWrapper } from '../../utils/ctrl_wrapper.js';

const getFilteredDataController = ctrlWrapper(async (req, res, next) => {
  const { number } = req.params;
  const numValue = parseInt(number, 10);

  console.log(numValue);

  const { startTime, endTime } = req.query;

  let queryConditions = { TrackNum: { $gt: 0 } };

  if (startTime && endTime) {
    queryConditions.Time = {
      $gte: parseFloat(startTime),
      $lte: parseFloat(endTime),
    };
  } else if (startTime) {
    queryConditions.Time = { $gte: parseFloat(startTime) };
  } else if (endTime) {
    queryConditions.Time = { $lte: parseFloat(endTime) };
  }

  let dataRecords;
  console.log(queryConditions);
  switch (numValue) {
    case 10:
      dataRecords = await DataAnalysis10.find(queryConditions);
      break;
    case 11:
      dataRecords = await DataAnalysis11.find(queryConditions);
      break;
    case 12:
      dataRecords = await DataAnalysis12.find(queryConditions);
      break;
    case 13:
      dataRecords = await DataAnalysis13.find(queryConditions);
      break;
    case 14:
      dataRecords = await DataAnalysis14.find(queryConditions);
      break;
    case 15:
      dataRecords = await DataAnalysis15.find(queryConditions);
      break;
    case 16:
      dataRecords = await DataAnalysis16.find(queryConditions);
      break;
    case 17:
      dataRecords = await DataAnalysis17.find(queryConditions);
      break;
    case 18:
      dataRecords = await DataAnalysis18.find(queryConditions);
      break;
    default:
      dataRecords = await DataAnalysis10.find(queryConditions);
      break;
  }

  res.status(200).json(dataRecords);
});

export default getFilteredDataController;
