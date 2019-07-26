import {expect} from 'chai';
import * as HttpStatus from 'http-status-codes';

import {stubRequest, stubResponse} from '../helpers';
import {error, exception} from '../../src/controller/test';

describe('Test Controller', () => {
  describe('error', () => {
    it('should return 500 w/ error', () => {
      const req = stubRequest();
      const res = stubResponse();

      error(req, res);

      expect(res.status.callCount).to.equal(1);
      const statusArgs = res.status.firstCall.args;
      expect(statusArgs[0]).to.equal(HttpStatus.INTERNAL_SERVER_ERROR);

      expect(res.json.callCount).to.equal(1);
      const jsonArgs = res.json.firstCall.args;
      expect(jsonArgs[0].status).to.equal('error');
      expect(jsonArgs[0].error).to.equal('something went wrong');
    });
  });

  describe('exception', () => {
    it('should thow error', () => {
      const req = stubRequest();
      const res = stubResponse();

      expect(() => {
        exception(req, res);
      }).to.throw('something went wrong');
    });
  });
});
