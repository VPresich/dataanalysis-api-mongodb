import HoughData from '../../models/houghData.js';
import { ctrlWrapper } from '../../utils/ctrl_wrapper.js';

const getAllHoughDataController = ctrlWrapper(async (req, res, next) => {
  const houghData = await HoughData.find();
  res.status(200).json(houghData);
});

export default getAllHoughDataController;
