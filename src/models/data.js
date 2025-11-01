import mongoose from 'mongoose';

const dataSchema = new mongoose.Schema(
  {
    id_source: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'DataSource',
      required: true,
    },
    CVpositive: { type: String, default: 'None' },
    CVstable: { type: String, default: 'None' },
    CApositive: { type: String, default: 'None' },
    CAstable: { type: String, default: 'None' },
    CTpositive: { type: String, default: 'None' },
    CTstable: { type: String, default: 'None' },
    X: { type: Number, default: 0.0 },
    Y: { type: Number, default: 0.0 },
    Z: { type: Number, default: 0.0 },
    Kde: { type: String, default: 'None' },
    KdeWeighted: { type: String, default: 'None' },
    Gaussian: { type: String, default: 'None' },
    GaussianWeighted: { type: String, default: 'None' },
    EvaluationNum: { type: String, default: 'None' },
    IMMconsistentValue: { type: String, default: 'None' },
    probability: { type: String, default: 'None' },
    TrackConsistent: { type: String, default: 'None' },
    VelocityConsistent: { type: String, default: 'None' },
    IMMconsistent: { type: String, default: 'None' },
    IMMpositive: { type: String, default: 'None' },
    velocityOK: { type: String, default: 'None' },
    speed: { type: String, default: 'None' },
    TrackNum: { type: Number, default: 0 },
    Time: { type: Number, default: 0.0 },
  },
  {
    timestamps: true,
  }
);

const Data = mongoose.model('Data', dataSchema);

export default Data;
