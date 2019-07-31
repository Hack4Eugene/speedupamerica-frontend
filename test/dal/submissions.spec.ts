import {pool} from '../../src/dal/connection';
import {getCount, create} from '../../src/dal/submissions';
import {expect} from 'chai';
import {cloneDeep} from 'lodash';
import * as sinon from 'sinon';
import {errInvalidArgs, errConnectionRefused} from '../../src/common/errors';

const createSuccessObj = {
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
  }),

  describe('create(submission)', () => {
    let sandbox: sinon.SinonSandbox;

    beforeEach(() => {
      sandbox = sinon.createSandbox();
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should create submission successfully', async () => {
      sandbox.stub(pool, 'query').callsFake(async () => {
        return Promise.resolve(createSuccessObj);
      });
      const response = await create(createSuccessObj);

      expect(response.latitude).to.equal(44.065);
      expect(response.longitude).to.equal(-123.0941);
      expect(response.accuracy).to.equal(50);
      expect(response.address).to.equal('Eugene');
      expect(response.actual_down_speed).to.equal(20.5);
      expect(response.actual_upload_speed).to.equal(2.5);
      expect(response.testing_for).to.equal('WiFi');
      expect(response.zip_code).to.equal('97401');
      expect(response.provider).to.equal('Comcast');
      expect(response.connected_with).to.equal('WiFi');
      expect(response.monthly_price).to.equal('60');
      expect(response.provider_down_speed).to.equal(25.0);
      expect(response.rating).to.equal(6);
      expect(response.ping).to.equal(200);
      expect(response.hostname).to.equal('localhost');
    });

    it('should handle invalid parameters', async () => {
      const invalidSubmission = cloneDeep(createSuccessObj);
      invalidSubmission.latitude = -123.0941;
      invalidSubmission.longitude = 44.065;
      invalidSubmission.accuracy = -1;
      invalidSubmission.actual_upload_speed = -1;
      invalidSubmission.ping = -1;
      invalidSubmission.rating = 0;
      invalidSubmission.testing_for = 'a'.repeat(256);
      invalidSubmission.address = 'a'.repeat(256);
      invalidSubmission.provider = 'a'.repeat(256);
      invalidSubmission.connected_with = 'a'.repeat(256);
      invalidSubmission.monthly_price = 'a'.repeat(256);
      invalidSubmission.hostname = 'a-z!?';

      create(invalidSubmission).catch((err) => {
        expect(err).to.equal(errInvalidArgs);
        expect(err.message).to.equal('Invalid args');
      });
    });

    it('should handle query connection error', async () => {
      sandbox.stub(pool, 'query').callsFake(async () => {
        return errConnectionRefused;
      });
      create(createSuccessObj).catch((err) => {
        expect(err).to.equal(errConnectionRefused);
        expect(err.code).to.equal('ECONNREFUSED');
      });
    });
  });
});

