import {
  DataAnalysis10,
  DataAnalysis11,
  DataAnalysis12,
  DataAnalysis13,
  DataAnalysis14,
  DataAnalysis15,
  DataAnalysis16,
  DataAnalysis17,
} from '../../models/dataAnalysis.js';

import { ctrlWrapper } from '../../utils/ctrl_wrapper.js';

const getDataByNumberController = ctrlWrapper(async (req, res, next) => {
  const { number } = req.params;
  const numValue = parseInt(number, 10);

  let dataRecords;
  switch (numValue) {
    case 10:
      dataRecords = await DataAnalysis10.find({ TrackNum: { $gt: 0 } });
      break;
    case 11:
      dataRecords = await DataAnalysis11.find({ TrackNum: { $gt: 0 } });
      break;
    case 12:
      dataRecords = await DataAnalysis12.find({ TrackNum: { $gt: 0 } });
      break;
    case 13:
      dataRecords = await DataAnalysis13.find({ TrackNum: { $gt: 0 } });
      break;
    case 14:
      dataRecords = await DataAnalysis14.find({ TrackNum: { $gt: 0 } });
      break;
    case 15:
      dataRecords = await DataAnalysis15.find({ TrackNum: { $gt: 0 } });
      break;
    case 16:
      dataRecords = await DataAnalysis16.find({ TrackNum: { $gt: 0 } });
      break;
    case 17:
      dataRecords = await DataAnalysis17.find({ TrackNum: { $gt: 0 } });
      break;
    default:
      dataRecords = await DataAnalysis10.find({ TrackNum: { $gt: 0 } });
      break;
  }

  res.status(200).json(dataRecords);
});

export default getDataByNumberController;
