// import Data from '../../models/data.js';
// import { ctrlWrapper } from '../../utils/ctrl_wrapper.js';

// const getUserDataController = ctrlWrapper(async (req, res, next) => {
//   const { id } = req.user; // current user's ID
//   const { number } = req.params;
//   const numValue = parseInt(number, 10);
//   const { startTime, endTime } = req.query;

//   // Base query: filter by user and source number
//   const queryConditions = {
//     id_user: id,
//     source_number: numValue,
//   };

//   // Optional time filters
//   if (startTime && endTime) {
//     queryConditions.Time = {
//       $gte: parseFloat(startTime),
//       $lte: parseFloat(endTime),
//     };
//   } else if (startTime) {
//     queryConditions.Time = { $gte: parseFloat(startTime) };
//   } else if (endTime) {
//     queryConditions.Time = { $lte: parseFloat(endTime) };
//   }

//   const dataRecords = await Data.find(queryConditions);

//   res.status(200).json(dataRecords);
// });

// export default getUserDataController;

import { ctrlWrapper } from '../../utils/ctrl_wrapper.js';
import { getUserDataService } from '../../services/data/get_user_data_service.js';

const getUserDataController = ctrlWrapper(async (req, res, next) => {
  const { id } = req.user; // current user's ID
  const { number } = req.params;
  const numValue = parseInt(number, 10);
  const { startTime, endTime } = req.query;

  // Call the service to get data
  const dataRecords = await getUserDataService(
    id,
    numValue,
    startTime,
    endTime
  );

  res.status(200).json(dataRecords);
});

export default getUserDataController;
