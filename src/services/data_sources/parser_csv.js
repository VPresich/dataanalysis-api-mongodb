import fs from 'fs';
import csv from 'csv-parser';
import Data from '../../models/data.js';

function convertValue(value) {
  if (value == null) return '';
  const trimmed = value.trim();

  if (trimmed === '') return '';
  const num = Number(trimmed);
  if (!isNaN(num) && trimmed.match(/^[-+]?\d*\.?\d+(e[-+]?\d+)?$/i)) {
    return num;
  }

  return trimmed;
}

/**
 * Parses a tab-delimited CSV file and saves its contents to the database.
 * If a MongoDB session is provided, the insert operation runs within the transaction.
 *
 * @param {Object} fileObj - The uploaded file object.
 * @param {Object} dataSource - The DataSource document reference.
 * @param {ClientSession} [session] - Optional MongoDB session for transactions.
 * @returns {Promise<Object>} Summary of the upload result.
 */
export const parseAndSaveCsv = (fileObj, dataSource, session = null) => {
  return new Promise((resolve, reject) => {
    const results = [];

    fs.createReadStream(fileObj.path)
      .pipe(
        csv({
          separator: '\t',
          skipLines: 0,
          strict: true,
          mapHeaders: ({ header }) => header.trim(),
          mapValues: ({ value }) => convertValue(value),
        })
      )
      .on('data', row => {
        if (Object.keys(row).length === 0) return;
        results.push({ id_source: dataSource._id, ...row });
      })
      .on('end', async () => {
        if (results.length === 0)
          return reject(
            new Error('File is empty or not properly tab-delimited.')
          );

        try {
          const inserted = session
            ? await Data.insertMany(results, { session })
            : await Data.insertMany(results);

          try {
            fs.unlinkSync(fileObj.path);
          } catch (e) {
            console.warn(`Could not delete file: ${e.message}`);
          }

          resolve({
            message: 'Data uploaded successfully',
            totalRecords: inserted.length,
          });
        } catch (err) {
          reject(err);
        }
      })
      .on('error', err => {
        reject(err);
      });
  });
};
