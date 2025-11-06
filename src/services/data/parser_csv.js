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

export const parseAndSaveCsv = (fileObj, dataSource) => {
  return new Promise((resolve, reject) => {
    const results = [];
    // let lineNumber = 0;

    // console.log(`Starting to parse file: ${fileObj.path}`);

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
        // lineNumber++;
        // if (lineNumber <= 3) console.log(`Row ${lineNumber}:`, row);

        if (Object.keys(row).length === 0) return;
        results.push({ id_source: dataSource._id, ...row });
      })
      .on('end', async () => {
        // console.log(`Parsing finished. Total rows: ${results.length}`);

        if (results.length === 0)
          return reject(
            new Error('File is empty or not properly tab-delimited.')
          );

        try {
          // console.log('Saving data to database...');
          const inserted = await Data.insertMany(results);
          // console.log(`Saved ${inserted.length} records.`);
          try {
            fs.unlinkSync(fileObj.path);
          } catch (e) {
            console.warn(`Could not delete file: ${e.message}`);
          }
          resolve({
            message: 'Data uploaded successfully',
            sourceId: dataSource._id,
            totalRecords: inserted.length,
          });
        } catch (err) {
          console.error('Database insert error:', err);
          reject(err);
        }
      })
      .on('error', err => {
        console.error('File read error:', err);
        reject(err);
      });
  });
};
