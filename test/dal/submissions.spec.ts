import {pool} from '../../src/dal/connection';
import {getCount} from '../../src/dal/submissions';
import {expect} from 'chai';
import * as sinon from 'sinon';

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
  });
});
