import {pool} from '../../src/dal/connection';
import {getCount, create} from '../../src/dal/submissions';
import {errInvalidArgs} from '../../src/dal/errors';
import {cloneDeep} from 'lodash';

import {expect} from 'chai';
import * as sinon from 'sinon';

const createSuccessObj = {
  latitude: 44.065,
  longitude: -123.0941,
  accuracy: 50,
  address: 'Eugene',
  actual_down_speed: 20.5,
  actual_upload_speed: 2.5,
  testing_for: '',
  zip_code: '97401',
  provider: 'Comcast',
  connected_with: '',
  monthly_price: '60',
  provider_down_speed: 25.0,
  rating: 6,
  ping: 200,
  hostname: '',
};

describe('Submissions DAL', () => {
  const fakeError = new Error('something went wrong');

  describe('getCount()', () => {
    let sandbox: sinon.SinonSandbox;

    beforeEach(() => {
      sandbox = sinon.createSandbox();
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should get count of submissions', async () => {
      sandbox.stub(pool, 'query').callsFake(async () => {
        return Promise.resolve([[{count: 0}]]);
      });

      const count = await getCount();
      expect(count).to.equal(0);
    });

    it('should handle database error', async () => {
      sandbox.stub(pool, 'query').callsFake(async () => {
        return Promise.reject(fakeError);
      });

      try {
        await getCount();
      } catch (err) {
        expect(err).to.not.be.null;
        expect(err.message).to.equal(fakeError.message);
      }
    });

    it('should create submission successfully', async () => {
      sandbox.stub(pool, 'query').callsFake(async () => {
        return Promise.resolve([createSuccessObj]);
      });
      const response = await create(createSuccessObj);
      expect(response).to.equal(createSuccessObj);
    });

    it('should handle invalid latitude, longitude values', async () => {
      sandbox.stub(pool, 'query').callsFake(async () => {
        return Promise.reject(errInvalidArgs);
      });

      const invalidCoordinates = cloneDeep(createSuccessObj);
      invalidCoordinates.latitude = -123.0941;
      invalidCoordinates.longitude = 44.065;

      try {
        await create(invalidCoordinates);
      } catch (err) {
        expect(err).to.equal(errInvalidArgs);
      }
    });

    it('should handle number values less than 0', async () => {
      sandbox.stub(pool, 'query').callsFake(async () => {
        return Promise.reject(errInvalidArgs);
      });
      const invalidNumberValues = cloneDeep(createSuccessObj);
      invalidNumberValues.accuracy = -100;
      invalidNumberValues.actual_down_speed = -100000;
      invalidNumberValues.actual_upload_speed = -0.4;

      try {
        await create(invalidNumberValues);
      } catch (err) {
        expect(err).to.equal(errInvalidArgs);
      }
    });

    it('should handle undefined string values', async () => {
      sandbox.stub(pool, 'query').callsFake(async () => {
        return Promise.reject(errInvalidArgs);
      });
      const undefinedStringValues = cloneDeep(createSuccessObj);
      undefinedStringValues.testing_for = undefined;
      undefinedStringValues.address = undefined;
      undefinedStringValues.provider = undefined;

      try {
        await create(undefinedStringValues);
      } catch (err) {
        expect(err).to.equal(errInvalidArgs);
      }
    });
  });
});
