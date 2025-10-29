import { Schema, mongoose } from 'mongoose';
const themeSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    color: {
      type: String,
      required: true,
      enum: ['red', 'blue', 'green', 'yellow', 'pink'],
      default: 'yellow',
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

export default mongoose.model('Theme', themeSchema);
