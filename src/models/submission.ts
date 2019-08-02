/* eslint-disable max-len */
const Joi = require('@hapi/joi');
import {errInvalidArgs} from '../common/errors';
import {logging} from '../common/logging';
import {create} from '../dal/submissions';

class Submission {
  verifySubmission(submission: SubmissionType): boolean {
    const result = Joi.validate(submission, submissionSchema);
    if (result.error) {
      logging.error('Submission Create (Verify)', result.error.details);
      throw errInvalidArgs;
    }
    return true;
  }

  create(submission: SubmissionType): boolean {
    this.verifySubmission(submission);

    create(submission)
        .catch((error) => {
          logging.error('Submission Create', error);
          throw error;
        });

    return true;
  }
}

declare type SubmissionType = {
    latitude: number | null,
    longitude: number | null,
    accuracy: number | null,
    actual_down_speed: number,
    actual_upload_speed: number,
    testing_for: string | null
    address: string | null,
    zip_code: string | null,
    provider: string | null,
    connected_with: string | null,
    monthly_price: string | null,
    provider_down_speed: number | null,
    rating: number | null,
    ping: number | null,
    hostname: string | null
};

const submissionSchema = Joi.object().keys({
  latitude: Joi.number().min(-90).max(90).allow(null),
  longitude: Joi.number().min(-180).max(180).allow(null),
  accuracy: Joi.number().min(0).max(4294967296).allow(null),
  actual_down_speed: Joi.number().min(0).max(1.8446744e+19),
  actual_upload_speed: Joi.number().min(0).max(1.8446744e+19),
  testing_for: Joi.string().trim().max(255).allow(null),
  address: Joi.string().trim().max(255).allow(null),
  zip_code: Joi.string().trim().regex(/(^\d{5}$)|(^\d{5}-\d{4}$)/).allow(null),
  provider: Joi.string().trim().max(255).allow(null),
  connected_with: Joi.string().trim().max(255).allow(null),
  monthly_price: Joi.string().trim().max(255).allow(null),
  provider_down_speed: Joi.number().min(0).max(1.8446744e+19).allow(null),
  rating: Joi.number().min(1).max(1.8446744e+19).allow(null),
  ping: Joi.number().min(0).max(1.8446744e+19).allow(null),
  hostname: Joi.string().hostname().allow(null),
});

export {SubmissionType, Submission, errInvalidArgs};
