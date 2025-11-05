import fs from 'fs';
import csv from 'csv-parser';
import createHttpError from 'http-errors';

import DataSource from '../../models/data_source.js'; // fixed import path
import Data from '../../models/data.js'; // model for detailed data
import User from '../../models/user.js'; // user model for authorization check

const uploadDataService = async ({
  id,
  source_number,
  source_name,
  file_name,
  source_comment,
  fileObj,
}) => {
  const user = await User.findById(id);
  if (!user) throw createHttpError(401, 'Unauthorized');

  const existingSource = await DataSource.findOne({
    id_user: id,
    source_number,
  });
  if (existingSource)
    throw createHttpError(400, 'Source with this number already exists');

  const dataSource = new DataSource({
    id_user: id,
    source_number,
    source_name,
    file_name,
    source_comment,
  });
  await dataSource.save();

  const results = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream(fileObj.path)
      .pipe(csv())
      .on('data', row => results.push({ id_source: dataSource._id, ...row }))
      .on('end', async () => {
        try {
          await Data.insertMany(results);
          resolve({
            message: 'Data uploaded successfully',
            sourceId: dataSource._id,
            totalRecords: results.length,
          });
        } catch (err) {
          reject(err);
        }
      })
      .on('error', err => reject(err));
  });
};

export default uploadDataService;
