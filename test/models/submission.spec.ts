import {expect} from 'chai';
import {cloneDeep} from 'lodash';
import {verifySubmission, errInvalidArgs} from '../../src/models/submission';

describe('Model Submission', () => {
  const submission = {
    latitude: 44.065,
    longitude: -123.0941,
    accuracy: 50,
    address: 'Eugene',
    actual_down_speed: 20.5,
    actual_upload_speed: 2.5,
    testing_for: 'WiFi',
    zip_code: '97401',
    provider: 'Comcast',
    connected_with: 'WiFi',
    monthly_price: '60',
    provider_down_speed: 25.0,
    rating: 6,
    ping: 200,
    hostname: 'localhost',
  };

  describe('verifySubmission(submission) - SUCCESS', () => {
    it('should verify submission', () => {
      const result = verifySubmission(submission);
      expect(result).to.be.true;
    });

    it('should verify submission with expected null values', () => {
      const expectedNullValue = cloneDeep(submission);
      expectedNullValue.accuracy = null;
      expectedNullValue.testing_for = null;
      expectedNullValue.address = null;
      expectedNullValue.provider = null;
      expectedNullValue.connected_with = null;
      expectedNullValue.monthly_price = null;
      expectedNullValue.provider_down_speed = null;
      expectedNullValue.rating = null;
      expectedNullValue.ping = null;
      expectedNullValue.hostname = null;

      const result = verifySubmission(expectedNullValue);
      expect(result).to.be.true;
    });

    it('should verify submission with ZIP_CODE [5 digit]', () => {
      const zipCodeSubmission = cloneDeep(submission);
      zipCodeSubmission.zip_code = '90210';

      const result = verifySubmission(zipCodeSubmission);
      expect(result).to.be.true;
    });

    it('should verify submission with ZIP_CODE+4 [9 digit]', () => {
      const zipCodeSubmission = cloneDeep(submission);
      zipCodeSubmission.zip_code = '90210-0210';

      const result = verifySubmission(zipCodeSubmission);
      expect(result).to.be.true;
    });

    it('should verify submission with hostname "localhost"', () => {
      const hostnameSubmission = cloneDeep(submission);
      hostnameSubmission.hostname = 'localhost';

      const result = verifySubmission(hostnameSubmission);
      expect(result).to.be.true;
    });

    it('should verify submission with hostname "127.0.0.1"', () => {
      const hostnameSubmission = cloneDeep(submission);
      hostnameSubmission.hostname = '127.0.0.1';

      const result = verifySubmission(hostnameSubmission);
      expect(result).to.be.true;
    });
  });

  describe('verifySubmission(submission) - ERROR', () => {
    it('should handle invalid coordinates', () => {
      const invalidCoordinates = cloneDeep(submission);
      invalidCoordinates.latitude = -123.0941;
      invalidCoordinates.longitude = 44.065;
      expect(() => {
        verifySubmission(invalidCoordinates);
      }).to.throw(errInvalidArgs);
    });

    it('should handle invalid negative accuracy', () => {
      const invalidSubmission = cloneDeep(submission);
      invalidSubmission.accuracy = -1;
      expect(() => {
        verifySubmission(invalidSubmission);
      }).to.throw(errInvalidArgs);
    });

    it('should handle invalid large accuracy', () => {
      const invalidSubmission = cloneDeep(submission);
      invalidSubmission.accuracy = 4294967296 + 1;
      expect(() => {
        verifySubmission(invalidSubmission);
      }).to.throw(errInvalidArgs);
    });

    it('should handle invalid negative actual_down_speed', () => {
      const invalidSubmission = cloneDeep(submission);
      invalidSubmission.actual_down_speed = -1;
      expect(() => {
        verifySubmission(invalidSubmission);
      }).to.throw(errInvalidArgs);
    });

    it('should handle invalid large actual_down_speed', () => {
      const invalidSubmission = cloneDeep(submission);
      invalidSubmission.actual_down_speed = 1.8446744e+19 + 1;
      expect(() => {
        verifySubmission(invalidSubmission);
      }).to.throw(errInvalidArgs);
    });

    it('should handle invalid negative actual_upload_speed', () => {
      const invalidSubmission = cloneDeep(submission);
      invalidSubmission.actual_upload_speed = -1;
      expect(() => {
        verifySubmission(invalidSubmission);
      }).to.throw(errInvalidArgs);
    });

    it('should handle invalid large actual_upload_speed', () => {
      const invalidSubmission = cloneDeep(submission);
      invalidSubmission.actual_upload_speed = 1.8446744e+19 + 1;
      expect(() => {
        verifySubmission(invalidSubmission);
      }).to.throw(errInvalidArgs);
    });

    it('should handle invalid negative ping', () => {
      const invalidSubmission = cloneDeep(submission);
      invalidSubmission.ping = -1;
      expect(() => {
        verifySubmission(invalidSubmission);
      }).to.throw(errInvalidArgs);
    });

    it('should handle invalid large ping', () => {
      const invalidSubmission = cloneDeep(submission);
      invalidSubmission.ping = 1.8446744e+19 + 1;
      expect(() => {
        verifySubmission(invalidSubmission);
      }).to.throw(errInvalidArgs);
    });

    it('should handle invalid zero rating', () => {
      const invalidSubmission = cloneDeep(submission);
      invalidSubmission.rating = 0;
      expect(() => {
        verifySubmission(invalidSubmission);
      }).to.throw(errInvalidArgs);
    });

    it('should handle invalid large rating', () => {
      const invalidSubmission = cloneDeep(submission);
      invalidSubmission.rating = 1.8446744e+19 + 1;
      expect(() => {
        verifySubmission(invalidSubmission);
      }).to.throw(errInvalidArgs);
    });

    it('should handle invalid string values', () => {
      const invalidSubmission = cloneDeep(submission);
      invalidSubmission.testing_for = 'a'.repeat(256);
      invalidSubmission.address = 'a'.repeat(256);
      invalidSubmission.provider = 'a'.repeat(256);
      invalidSubmission.connected_with = 'a'.repeat(256);
      invalidSubmission.monthly_price = 'a'.repeat(256);

      expect(() => {
        verifySubmission(invalidSubmission);
      }).to.throw(errInvalidArgs);
    });

    it('should handle invalid hostname', () => {
      const invalidSubmission = cloneDeep(submission);
      invalidSubmission.hostname = 'a-z!?';

      expect(() => {
        verifySubmission(invalidSubmission);
      }).to.throw(errInvalidArgs);
    });
  });
});
