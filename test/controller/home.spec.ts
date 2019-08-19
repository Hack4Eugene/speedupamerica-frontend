import {expect} from 'chai';
import * as HttpStatus from 'http-status-codes';

import {stubRequest, stubResponse} from '../helpers';
import {index} from '../../src/controller/home';

describe('Home Controller', () => {
  describe('index', () => {
    it('should return OK w/ body=home', () => {
      const req = stubRequest();
      const res = stubResponse();

      index(req, res);

      expect(res.status.callCount).to.equal(1);
      expect(res.status.firstCall.args[0]).to.equal(HttpStatus.OK);
      expect(res.end.callCount).to.equal(1);
      expect(res.end.firstCall.args[0]).to.equal(index);
    });
  });
});
