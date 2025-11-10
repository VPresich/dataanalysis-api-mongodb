import mongoose from 'mongoose';

const dataSourceSchema = new mongoose.Schema(
  {
    id_user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    source_number: {
      type: Number,
      required: true,
    },
    source_name: {
      type: String,
      default: 'dataIMM',
    },
    file_name: {
      type: String,
      default: null,
    },
    comment: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

dataSourceSchema.index({ id_user: 1, source_number: 1 }, { unique: true });

const DataSource = mongoose.model('DataSource', dataSourceSchema);

export default DataSource;
