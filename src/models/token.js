import { Schema, mongoose } from 'mongoose';
const tokenSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    token: {
      type: String,
      default: null,
    },
    app: {
      type: String,
      required: true,
      enum: ['teachers', 'nannies', 'psychologists', 'dataanalysis'],
      default: 'teachers',
    },
  },
  { versionKey: false, timestamps: true }
);

export default mongoose.model('Token', tokenSchema);
