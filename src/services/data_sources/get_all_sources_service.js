import DataSource from '../../models/data_source.js';

const getAllSourcesService = async id => {
  const recorrds = await DataSource.find({ id_user: id }).sort({
    createdAt: -1,
  });

  return recorrds;
};

export default getAllSourcesService;
