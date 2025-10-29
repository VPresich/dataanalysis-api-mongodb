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
  DataAnalysis19,
  DataAnalysis20,
  DataAnalysis21,
  DataAnalysis22,
  DataAnalysis23,
  DataAnalysis24,
  DataAnalysis25,
  DataAnalysis26,
  DataAnalysis27,
  DataAnalysis28,
  DataAnalysis29,
  DataAnalysis30,
  DataAnalysis31,
  DataAnalysis32,
  DataAnalysis33,
  DataAnalysis34,
  DataAnalysis35,
  DataAnalysis36,
  DataAnalysis37,
  DataAnalysis38,
  DataAnalysis39,
  DataAnalysis40,
  DataAnalysis41,
  DataAnalysis42,
  DataAnalysis43,
  DataAnalysis44,
  DataAnalysis45,
  DataAnalysis46,
  DataAnalysis47,
  DataAnalysis48,
  DataAnalysis49,
  DataAnalysis50,
  DataAnalysis51,
  DataAnalysis52,
  DataAnalysis53,
  DataAnalysis54,
  DataAnalysis55,
  DataAnalysis56,
  DataAnalysis57,
  DataAnalysis58,
  DataAnalysis59,
  DataAnalysis60,
  DataAnalysis61,
  DataAnalysis62,
  DataAnalysis63,
  DataAnalysis64,
  DataAnalysis65,
  DataAnalysis66,
  DataAnalysis67,
  DataAnalysis68,
  DataAnalysis69,
  DataAnalysis70,
  DataAnalysis71,
  DataAnalysis72,
  DataAnalysis73,
  DataAnalysis74,
  DataAnalysis75,
  DataAnalysis76,
  DataAnalysis77,
  DataAnalysis78,
  DataAnalysis79,
  DataAnalysis80,
  DataAnalysis81,
  DataAnalysis82,
  DataAnalysis83,
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
    case 18:
      dataRecords = await DataAnalysis18.find({ TrackNum: { $gt: 0 } });
      break;
    case 19:
      dataRecords = await DataAnalysis19.find({ TrackNum: { $gt: 0 } });
      break;
    case 20:
      dataRecords = await DataAnalysis20.find({ TrackNum: { $gt: 0 } });
      break;
    case 21:
      dataRecords = await DataAnalysis21.find({ TrackNum: { $gt: 0 } });
      break;
    case 22:
      dataRecords = await DataAnalysis22.find({ TrackNum: { $gt: 0 } });
      break;
    case 23:
      dataRecords = await DataAnalysis23.find({ TrackNum: { $gt: 0 } });
      break;
    case 24:
      dataRecords = await DataAnalysis24.find({ TrackNum: { $gt: 0 } });
      break;
    case 25:
      dataRecords = await DataAnalysis25.find({ TrackNum: { $gt: 0 } });
      break;
    case 26:
      dataRecords = await DataAnalysis26.find({ TrackNum: { $gt: 0 } });
      break;
    case 27:
      dataRecords = await DataAnalysis27.find({ TrackNum: { $gt: 0 } });
      break;
    case 28:
      dataRecords = await DataAnalysis28.find({ TrackNum: { $gt: 0 } });
      break;
    case 29:
      dataRecords = await DataAnalysis29.find({ TrackNum: { $gt: 0 } });
      break;
    case 30:
      dataRecords = await DataAnalysis30.find({ TrackNum: { $gt: 0 } });
      break;
    case 31:
      dataRecords = await DataAnalysis31.find({ TrackNum: { $gt: 0 } });
      break;
    case 32:
      dataRecords = await DataAnalysis32.find({ TrackNum: { $gt: 0 } });
      break;
    case 33:
      dataRecords = await DataAnalysis33.find({ TrackNum: { $gt: 0 } });
      break;
    case 34:
      dataRecords = await DataAnalysis34.find({ TrackNum: { $gt: 0 } });
      break;
    case 35:
      dataRecords = await DataAnalysis35.find({ TrackNum: { $gt: 0 } });
      break;
    case 36:
      dataRecords = await DataAnalysis36.find({ TrackNum: { $gt: 0 } });
      break;
    case 37:
      dataRecords = await DataAnalysis37.find({ TrackNum: { $gt: 0 } });
      break;
    case 38:
      dataRecords = await DataAnalysis38.find({ TrackNum: { $gt: 0 } });
      break;
    case 39:
      dataRecords = await DataAnalysis39.find({ TrackNum: { $gt: 0 } });
      break;
    case 40:
      dataRecords = await DataAnalysis40.find({ TrackNum: { $gt: 0 } });
      break;
    case 41:
      dataRecords = await DataAnalysis41.find({ TrackNum: { $gt: 0 } });
      break;
    case 42:
      dataRecords = await DataAnalysis42.find({ TrackNum: { $gt: 0 } });
      break;
    case 43:
      dataRecords = await DataAnalysis43.find({ TrackNum: { $gt: 0 } });
      break;
    case 44:
      dataRecords = await DataAnalysis44.find({ TrackNum: { $gt: 0 } });
      break;
    case 45:
      dataRecords = await DataAnalysis45.find({ TrackNum: { $gt: 0 } });
      break;
    case 46:
      dataRecords = await DataAnalysis46.find({ TrackNum: { $gt: 0 } });
      break;
    case 47:
      dataRecords = await DataAnalysis47.find({ TrackNum: { $gt: 0 } });
      break;
    case 48:
      dataRecords = await DataAnalysis48.find({ TrackNum: { $gt: 0 } });
      break;
    case 49:
      dataRecords = await DataAnalysis49.find({ TrackNum: { $gt: 0 } });
      break;
    case 50:
      dataRecords = await DataAnalysis50.find({ TrackNum: { $gt: 0 } });
      break;
    case 51:
      dataRecords = await DataAnalysis51.find({ TrackNum: { $gt: 0 } });
      break;
    case 52:
      dataRecords = await DataAnalysis52.find({ TrackNum: { $gt: 0 } });
      break;
    case 53:
      dataRecords = await DataAnalysis53.find({ TrackNum: { $gt: 0 } });
      break;
    case 54:
      dataRecords = await DataAnalysis54.find({ TrackNum: { $gt: 0 } });
      break;
    case 55:
      dataRecords = await DataAnalysis55.find({ TrackNum: { $gt: 0 } });
      break;
    case 56:
      dataRecords = await DataAnalysis56.find({ TrackNum: { $gt: 0 } });
      break;
    case 57:
      dataRecords = await DataAnalysis57.find({ TrackNum: { $gt: 0 } });
      break;
    case 58:
      dataRecords = await DataAnalysis58.find({ TrackNum: { $gt: 0 } });
      break;
    case 59:
      dataRecords = await DataAnalysis59.find({ TrackNum: { $gt: 0 } });
      break;
    case 60:
      dataRecords = await DataAnalysis60.find({ TrackNum: { $gt: 0 } });
      break;
    case 61:
      dataRecords = await DataAnalysis61.find({ TrackNum: { $gt: 0 } });
      break;
    case 62:
      dataRecords = await DataAnalysis62.find({ TrackNum: { $gt: 0 } });
      break;
    case 63:
      dataRecords = await DataAnalysis63.find({ TrackNum: { $gt: 0 } });
      break;
    case 64:
      dataRecords = await DataAnalysis64.find({ TrackNum: { $gt: 0 } });
      break;
    case 65:
      dataRecords = await DataAnalysis65.find({ TrackNum: { $gt: 0 } });
      break;
    case 66:
      dataRecords = await DataAnalysis66.find({ TrackNum: { $gt: 0 } });
      break;
    case 67:
      dataRecords = await DataAnalysis67.find({ TrackNum: { $gt: 0 } });
      break;
    case 68:
      dataRecords = await DataAnalysis68.find({ TrackNum: { $gt: 0 } });
      break;
    case 69:
      dataRecords = await DataAnalysis69.find({ TrackNum: { $gt: 0 } });
      break;
    case 70:
      dataRecords = await DataAnalysis70.find({ TrackNum: { $gt: 0 } });
      break;
    case 71:
      dataRecords = await DataAnalysis71.find({ TrackNum: { $gt: 0 } });
      break;
    case 72:
      dataRecords = await DataAnalysis72.find({ TrackNum: { $gt: 0 } });
      break;
    case 73:
      dataRecords = await DataAnalysis73.find({ TrackNum: { $gt: 0 } });
      break;
    case 74:
      dataRecords = await DataAnalysis74.find({ TrackNum: { $gt: 0 } });
      break;
    case 75:
      dataRecords = await DataAnalysis75.find({ TrackNum: { $gt: 0 } });
      break;
    case 76:
      dataRecords = await DataAnalysis76.find({ TrackNum: { $gt: 0 } });
      break;
    case 77:
      dataRecords = await DataAnalysis77.find({ TrackNum: { $gt: 0 } });
      break;
    case 78:
      dataRecords = await DataAnalysis78.find({ TrackNum: { $gt: 0 } });
      break;
    case 79:
      dataRecords = await DataAnalysis79.find({ TrackNum: { $gt: 0 } });
      break;
    case 80:
      dataRecords = await DataAnalysis80.find({ TrackNum: { $gt: 0 } });
      break;
    case 81:
      dataRecords = await DataAnalysis81.find({ TrackNum: { $gt: 0 } });
      break;
    case 82:
      dataRecords = await DataAnalysis82.find({ TrackNum: { $gt: 0 } });
      break;
    case 83:
      dataRecords = await DataAnalysis83.find({ TrackNum: { $gt: 0 } });
      break;
    default:
      dataRecords = await DataAnalysis31.find({ TrackNum: { $gt: 0 } });
      break;
  }

  res.status(200).json(dataRecords);
});

export default getDataByNumberController;
