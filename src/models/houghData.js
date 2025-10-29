import { Schema, model } from 'mongoose';

const houghDataSchema = new Schema(
  {
    x: { type: String, default: '0' },
    y: { type: String, default: '0' },
  },
  { timestamps: true, collection: 'houghData' }
);

export default model('HoughData', houghDataSchema);
