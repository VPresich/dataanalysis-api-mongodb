import createHttpError from 'http-errors';
import DataSource from '../../models/data_source.js';
import User from '../../models/user.js';

const updateSourceService = async ({
  id,
  source_number,
  source_name,
  file_name,
  comment,
}) => {
  const user = await User.findById(id);
  if (!user) throw createHttpError(404, 'User not found');

  const source = await DataSource.findOne({ id_user: id, source_number });
  if (!source)
    throw createHttpError(404, 'Source with this number does not exist');

  const updatedSourceData = {};
  if (source_name) updatedSourceData.source_name = source_name;
  if (file_name) updatedSourceData.file_name = file_name;
  if (comment) updatedSourceData.comment = comment;

  const updatedSource = await DataSource.findByIdAndUpdate(
    source._id,
    updatedSourceData,
    { new: true }
  );

  if (!updatedSource) throw createHttpError(404, 'Data source not found');

  return {
    message: `Source ${source_number} has been successfully updated.`,
    updatedSource,
  };
};

export default updateSourceService;
