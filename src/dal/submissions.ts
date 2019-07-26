import {pool} from './connection';
import {logging} from '../common/logging';
import {Submission} from '../common/typings';
import {verifySubmission} from './helper';

async function getCount(): Promise<number> {
  const query = 'SELECT count(*) as count FROM submissions';
  const [rows] = await pool.query(query);
  return rows[0].count;
}

async function create(submission: Submission): Promise<Submission> {
  verifySubmission(submission);

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
    'VALUES (?) ';

  const response = await pool.query(
      query,
      [latitude, longitude, accuracy, actual_down_speed,
        actual_upload_speed, testing_for, address, zip_code,
        provider, connected_with, monthly_price,
        provider_down_speed, rating, ping, hostname],
      (err, res) => {
        if (err) {
          logging.error('Submission Create (Connection)', err);
        } else {
          logging.log('info', 'Submission created!', res);
        }
      }
  );

  return response[0];
}

export {getCount, create};
