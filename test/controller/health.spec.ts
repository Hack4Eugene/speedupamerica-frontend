import {expect} from 'chai';
import * as HttpStatus from 'http-status-codes';

import {stubRequest, stubResponse} from '../helpers';
import {health} from '../../src/controller/health';

describe('Health Controller', () => {
  describe('health', () => {
    it('should return OK w/ status=ok', () => {
      const req = stubRequest();
      const res = stubResponse();

      health(req, res);

      expect(res.status.callCount).to.equal(1);
      expect(res.status.firstCall.args[0]).to.equal(HttpStatus.OK);
      expect(res.json.callCount).to.equal(1);
      expect(res.json.firstCall.args[0].status).to.equal('ok');
    });
  });
});
