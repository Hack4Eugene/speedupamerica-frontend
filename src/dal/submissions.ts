import {pool} from './connection';
import {logging} from '../common/logging';

const invalidArgs = new Error('invalid parameters');

async function getCount(): Promise<number> {
  const query = 'SELECT count(*) as count FROM submissions';
  const [rows] = await pool.query(query);
  return rows[0].count;
}


async function create(submission: Submission): Promise<Submission> {
  const {
    latitude, longitude, accuracy, actual_down_speed,
    actual_upload_speed, testing_for, address, zip_code,
    provider, connected_with, monthly_price,
    provider_down_speed, rating, ping, hostname,
  } = submission;

  // Invalid latitude, longitude coordinates
  if ((latitude < -90 || latitude > 90) ||
      (longitude < -180 || longitude > 180)) {
    logging.error('[Error] Submission Create (latitude, longitude).');
    throw invalidArgs;
  }

  const query: string = 'INSERT INTO submission ' +
    '(latitude, longitude, accuracy, actual_down_speed,' +
    'actual_upload_speed, testing_for, address, zip_code,' +
    'provider, connected_with, monthly_price,' +
    'provider_down_speed, rating, ping, hostname)' +
    'VALUES (?)';

  const response = await pool.query(
      query,
      [latitude, longitude, accuracy, actual_down_speed,
        actual_upload_speed, testing_for, address, zip_code,
        provider, connected_with, monthly_price,
        provider_down_speed, rating, ping, hostname],
      (err, res) => {
        if (err) {
          logging.error('Submission create error...', err);
        } else {
          logging.log('info', 'Submission created!', res);
        }
      }
  );

  return response[0];
}

interface Submission {
  latitude: number,
  longitude: number,
  accuracy: number,
  actual_down_speed: number,
  actual_upload_speed: number,
  testing_for: string,
  address: string,
  zip_code: string,
  provider: string,
  connected_with: string,
  monthly_price: string,
  provider_down_speed: number,
  rating: number,
  ping: number,
  hostname: string
};


export {getCount, create, invalidArgs};
