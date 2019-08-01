import {pool} from './connection';
import {SubmissionType} from '../models/submission';

async function getCount(): Promise<number> {
  const query = 'SELECT count(*) as count FROM submissions';
  const [rows] = await pool.query(query);
  return rows[0].count;
}

async function create(submission: SubmissionType): Promise<SubmissionType> {
  const {
    latitude, longitude, accuracy, actual_down_speed,
    actual_upload_speed, testing_for, address, zip_code,
    provider, connected_with, monthly_price,
    provider_down_speed, rating, ping, hostname,
  } = submission;

  const query: string = 'INSERT INTO submissions ' +
    '(latitude, longitude, accuracy, actual_down_speed, ' +
    'actual_upload_speed, testing_for, address, zip_code, ' +
    'provider, connected_with, monthly_price, ' +
    'provider_down_speed, rating, ping, hostname) ' +
    'VALUES (? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,?) ';

  const result = await pool.query(
      query,
      [latitude, longitude, accuracy, actual_down_speed,
        actual_upload_speed, testing_for, address, zip_code,
        provider, connected_with, monthly_price,
        provider_down_speed, rating, ping, hostname]
  );

  return result;
}

export {getCount, create};
