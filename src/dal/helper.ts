import {logging} from '../common/logging';
import {Submission} from '../common/typings';
import {errInvalidArgs} from './errors';

function verifySubmission(submission: Submission) {
  const {
    latitude, longitude, accuracy, actual_down_speed,
    actual_upload_speed, testing_for, address, zip_code,
    provider, connected_with, monthly_price,
    provider_down_speed, rating, ping, hostname,
  } = submission;

  console.log('Latitude:', latitude);
  console.log('Longitude:', longitude);
  // No invalid coordinates
  if ((latitude < -90 || latitude > 90) ||
    (longitude < -180 || longitude > 180)) {
    logging.error('Submission Create (latitude, longitude)');
    throw errInvalidArgs;
  }

  // No negative numbers
  if (accuracy < 0 ||
    actual_down_speed < 0 ||
    actual_upload_speed < 0 ||
    provider_down_speed < 0 ||
    ping < 0 ||
    rating < 1) {
    logging.error('Submission Create (no negative numbers).');
    throw errInvalidArgs;
  }

  // No undefined strings
  if (!testing_for ||
    !address ||
    !zip_code ||
    !provider ||
    !connected_with ||
    !monthly_price ||
    !hostname) {
    logging.error('Submission Create (string value is undefined).');
    throw errInvalidArgs;
  }
}

export {Submission, verifySubmission, errInvalidArgs};
