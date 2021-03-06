import {expect} from 'chai';
import * as HttpStatus from 'http-status-codes';

import {stubRequest, stubResponse} from '../helpers';
import {index, robots} from '../../src/controller/home';

describe('Home Controller', () => {
  describe('index', () => {
    it('should return OK w/ body=home', () => {
      const req = stubRequest();
      const res = stubResponse();

      index(req, res);

      expect(res.status.callCount).to.equal(1);
      expect(res.status.firstCall.args[0]).to.equal(HttpStatus.OK);
      expect(res.render.callCount).to.equal(1);
      expect(res.render.firstCall.args[0]).to.equal('home');
    });
  });

  describe('robots', () => {
    it('should return OK w/ body=home', () => {
      const req = stubRequest();
      const res = stubResponse();

      robots(req, res);

      expect(res.status.callCount).to.equal(1);
      expect(res.status.firstCall.args[0]).to.equal(HttpStatus.OK);
      expect(res.render.callCount).to.equal(1);
      expect(res.render.firstCall.args[0]).to.equal('robots');
    });
  });
});
