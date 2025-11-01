import { Schema, model } from 'mongoose';

const dataSchema = new Schema(
  {
    CVpositive: { type: String, default: 'None' },
    CVstable: { type: String, default: 'None' },
    CApositive: { type: String, default: 'None' },
    CAstable: { type: String, default: 'None' },
    CTpositive: { type: String, default: 'None' },
    CTstable: { type: String, default: 'None' },
    IMMconsistentValue: { type: String, default: 'None' },
    IMMconsistent: { type: String, default: 'None' },
    IMMpositive: { type: String, default: 'None' },
    velocityOK: { type: String, default: 'None' },
    speed: { type: String, default: 'None' },
    probability: { type: Number, default: 1.0 },
    X: { type: String, default: '0' },
    Y: { type: String, default: '0' },
    Z: { type: String, default: '0' },
    TrackNum: { type: Number, default: 0 },
    Time: { type: Number, default: 0.0 },
  },
  { timestamps: true }
);

const createDataModel = collectionName => {
  return model('DataAnalysis', dataSchema, collectionName);
};
export const DataAnalysis10 = createDataModel('filterdata2d_111_3_det_CTa');
export const DataAnalysis11 = createDataModel('filterdata2d_111_8_det_CTa');
export const DataAnalysis12 = createDataModel('filterdata2d_111_3_trace_CTa');
export const DataAnalysis13 = createDataModel('filterdata2d_111_8_trace_CTa');
export const DataAnalysis14 = createDataModel('filterdata2d_111_3_postNIS_CTa');
export const DataAnalysis15 = createDataModel('filterdata2d_111_8_postNIS_CTa');
export const DataAnalysis16 = createDataModel('filterdata2d_111_3_NIS_CTa');
export const DataAnalysis17 = createDataModel('filterdata2d_111_8_NIS_CTa');
export const DataAnalysis18 = createDataModel(
  'filterdata2d_111_3_postANIS_CTa'
);
