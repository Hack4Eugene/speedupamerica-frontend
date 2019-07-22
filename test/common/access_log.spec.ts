import events = require('events');

import {expect} from 'chai';
import * as sinon from 'sinon';
import * as HttpStatus from 'http-status-codes';

import {accessLogMiddleware, log} from '../../src/common/access_log';

describe('Access Log', () => {
  let sandbox: sinon.SinonSandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('accessLogMiddleware', () => {
    it('should have type=http on child log', () => {

    });

    it('should log response details', (done) => {
      const stub = sandbox.stub(log, 'info');

      const middleware = accessLogMiddleware();

      const req:any = new events.EventEmitter();
      req.ip = '0.0.0.0';
      req.method = 'GET';
      req.path = '/a/path';

      const res:any = {
        statusCode: HttpStatus.OK,
      };

      middleware(req, res, () => {
        req.emit('end');

        const call = stub.getCall(0);
        const args = (call.args as any);
        expect(args[0]).to.equal('request complete');
        expect(args[1].req.remote_ip).to.equal('0.0.0.0');
        expect(args[1].req.method).to.equal('GET');
        expect(args[1].req.path).to.equal('/a/path');
        expect(args[1].res.status_code).to.equal(HttpStatus.OK);

        done();
      });
    });

    it('should log error response with error level', (done) =>{
      const stub = sandbox.stub(log, 'error');

      const middleware = accessLogMiddleware();

      const req:any = new events.EventEmitter();
      req.ip = '1.1.1.1';
      req.method = 'DELETE';
      req.path = '/a/path';

      const res:any = {
        statusCode: HttpStatus.NOT_IMPLEMENTED,
      };

      middleware(req, res, () => {
        req.emit('end');

        const call = stub.getCall(0);
        const args = (call.args as any);
        expect(args[0]).to.equal('request error');
        expect(args[1].req.remote_ip).to.equal('1.1.1.1');
        expect(args[1].req.method).to.equal('DELETE');
        expect(args[1].req.path).to.equal('/a/path');
        expect(args[1].res.status_code).to.equal(HttpStatus.NOT_IMPLEMENTED);

        done();
      });
    });
  });
});
