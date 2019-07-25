import {pool} from '../../src/dal/connection';
import {getCount, create, invalidArgs} from '../../src/dal/submissions';
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

    it('should handle missing param', async () => {
      const invalidCoordinates = Object.assign(
          createSuccessObj,
          {latitude: -123.0941, longitude: 44.065});
      try {
        await create(invalidCoordinates);
      } catch (err) {
        console.log(err);
        expect(err.message).to.equal(invalidArgs.message);
      }
    });
  });
});
