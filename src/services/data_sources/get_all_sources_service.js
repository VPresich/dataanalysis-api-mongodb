import DataSource from '../../models/data_source.js';

const getAllSourcesService = async id => {
  const records = await DataSource.find({ id_user: id }).sort({
    createdAt: -1,
  });

  return records;
};

export default getAllSourcesService;
