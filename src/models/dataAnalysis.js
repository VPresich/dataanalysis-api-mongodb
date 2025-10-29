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
export const DataAnalysis19 = createDataModel('filterdata2d_111_3_ANIS_CTa');

export const DataAnalysis20 = createDataModel('filterdata2d_112_3_det_CTa');
export const DataAnalysis21 = createDataModel('filterdata2d_112_8_det_CTa');
export const DataAnalysis22 = createDataModel('filterdata2d_112_3_trace_CTa');
export const DataAnalysis23 = createDataModel('filterdata2d_112_8_trace_CTa');
export const DataAnalysis24 = createDataModel('filterdata2d_112_3_postNIS_CTa');
export const DataAnalysis25 = createDataModel('filterdata2d_112_8_postNIS_CTa');
export const DataAnalysis26 = createDataModel('filterdata2d_112_3_NIS_CTa');
export const DataAnalysis27 = createDataModel('filterdata2d_112_8_NIS_CTa');
export const DataAnalysis28 = createDataModel(
  'filterdata2d_112_3_postANIS_CTa'
);
export const DataAnalysis29 = createDataModel('filterdata2d_112_3_ANIS_CTa');

export const DataAnalysis30 = createDataModel('filterdata2d_113_3_det_CTa');
export const DataAnalysis31 = createDataModel('filterdata2d_113_8_det_CTa');
export const DataAnalysis32 = createDataModel('filterdata2d_113_3_trace_CTa');
export const DataAnalysis33 = createDataModel('filterdata2d_113_8_trace_CTa');
export const DataAnalysis34 = createDataModel('filterdata2d_113_3_postNIS_CTa');
export const DataAnalysis35 = createDataModel('filterdata2d_113_8_postNIS_CTa');
export const DataAnalysis36 = createDataModel('filterdata2d_113_3_NIS_CTa');
export const DataAnalysis37 = createDataModel('filterdata2d_113_8_NIS_CTa');
export const DataAnalysis38 = createDataModel(
  'filterdata2d_113_3_postANIS_CTa'
);
export const DataAnalysis39 = createDataModel('filterdata2d_113_3_ANIS_CTa');

export const DataAnalysis40 = createDataModel('filterdata2d_114_3_det_CTa');
export const DataAnalysis41 = createDataModel('filterdata2d_114_8_det_CTa');
export const DataAnalysis42 = createDataModel('filterdata2d_114_3_trace_CTa');
export const DataAnalysis43 = createDataModel('filterdata2d_114_8_trace_CTa');
export const DataAnalysis44 = createDataModel('filterdata2d_114_3_postNIS_CTa');
export const DataAnalysis45 = createDataModel('filterdata2d_114_8_postNIS_CTa');
export const DataAnalysis46 = createDataModel('filterdata2d_114_3_NIS_CTa');
export const DataAnalysis47 = createDataModel('filterdata2d_114_8_NIS_CTa');
export const DataAnalysis48 = createDataModel(
  'filterdata2d_114_3_postANIS_CTa'
);
export const DataAnalysis49 = createDataModel('filterdata2d_114_3_ANIS_CTa');

export const DataAnalysis50 = createDataModel('filterdata2d_115_3_det_CTa');
export const DataAnalysis51 = createDataModel('filterdata2d_115_8_det_CTa');
export const DataAnalysis52 = createDataModel('filterdata2d_115_3_trace_CTa');
export const DataAnalysis53 = createDataModel('filterdata2d_115_8_trace_CTa');
export const DataAnalysis54 = createDataModel('filterdata2d_115_3_postNIS_CTa');
export const DataAnalysis55 = createDataModel('filterdata2d_115_8_postNIS_CTa');
export const DataAnalysis56 = createDataModel('filterdata2d_115_3_NIS_CTa');
export const DataAnalysis57 = createDataModel('filterdata2d_115_8_NIS_CTa');
export const DataAnalysis58 = createDataModel(
  'filterdata2d_115_3_postANIS_CTa'
);
export const DataAnalysis59 = createDataModel('filterdata2d_115_3_ANIS_CTa');

export const DataAnalysis60 = createDataModel('filterdata2d_116_3_det_CTa');
export const DataAnalysis61 = createDataModel('filterdata2d_116_8_det_CTa');
export const DataAnalysis62 = createDataModel('filterdata2d_116_3_trace_CTa');
export const DataAnalysis63 = createDataModel('filterdata2d_116_8_trace_CTa');
export const DataAnalysis64 = createDataModel('filterdata2d_116_3_postNIS_CTa');
export const DataAnalysis65 = createDataModel('filterdata2d_116_8_postNIS_CTa');
export const DataAnalysis66 = createDataModel('filterdata2d_116_3_NIS_CTa');
export const DataAnalysis67 = createDataModel('filterdata2d_116_8_NIS_CTa');
export const DataAnalysis68 = createDataModel(
  'filterdata2d_116_3_postANIS_CTa'
);
export const DataAnalysis69 = createDataModel('filterdata2d_116_3_ANIS_CTa');

export const DataAnalysis70 = createDataModel('filterdata2d_117_3_det_CTa');
export const DataAnalysis71 = createDataModel('filterdata2d_117_8_det_CTa');
export const DataAnalysis72 = createDataModel('filterdata2d_117_3_trace_CTa');
export const DataAnalysis73 = createDataModel('filterdata2d_117_8_trace_CTa');
export const DataAnalysis74 = createDataModel('filterdata2d_117_3_postNIS_CTa');
export const DataAnalysis75 = createDataModel(
  'filterdata2d_117_81_postNIS_CTa'
);
export const DataAnalysis76 = createDataModel('filterdata2d_117_3_NIS_CTa');
export const DataAnalysis77 = createDataModel('filterdata2d_117_8_NIS_CTa');
export const DataAnalysis78 = createDataModel(
  'filterdata2d_117_3_postANIS_3_CTa'
);
export const DataAnalysis79 = createDataModel('filterdata2d_117_3_ANIS_CTa');

export const DataAnalysis80 = createDataModel('filterdata_single');
export const DataAnalysis81 = createDataModel('filterdata_single_new');
export const DataAnalysis82 = createDataModel(
  'filterdata_single_new_criteria_estimator'
);
export const DataAnalysis83 = createDataModel('filterdata_single2');
