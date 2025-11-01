import fs from 'fs';
import csv from 'csv-parser';
import createHttpError from 'http-errors';

import DataSource from '../../models/data_source.js'; // ✅ fixed import path
import Data from '../../models/data.js'; // model for detailed data
import User from '../../models/user.js'; // user model for authorization check

const uploadDataService = async (
  id,
  source_number,
  source_name,
  file_name,
  source_comments,
  filePath
) => {
  // Check if user exists
  const user = await User.findById(id);
  if (!user) {
    throw createHttpError(401, 'Unauthorized');
  }

  // Check if this source number already exists for the current user
  const existingSource = await DataSource.findOne({
    id_user: id,
    source_number,
  });
  if (existingSource) {
    throw createHttpError(400, 'Source with this number already exists');
  }

  // Create new data source record
  const dataSource = new DataSource({
    id_user: id,
    source_number,
    source_name,
    file_name,
    source_comments,
  });

  await dataSource.save();

  // Parse CSV file and prepare data records
  const results = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', row => {
        results.push({
          id_source: dataSource._id,
          ...row, // spread CSV row fields directly
        });
      })
      .on('end', async () => {
        try {
          // Insert all parsed rows into the Data collection
          await Data.insertMany(results);
          resolve({
            message: 'Data uploaded successfully',
            sourceId: dataSource._id,
            totalRecords: results.length,
          });
        } catch (error) {
          reject(error);
        }
      })
      .on('error', err => reject(err));
  });
};

export default uploadDataService;
