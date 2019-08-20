import {app} from '../../src/application';
import {expect} from 'chai';
import * as request from 'supertest';
import * as HttpStatus from 'http-status-codes';

describe('Application', () => {
  let server:any = null;

  before((done) => {
    // Listen on ephemeral port
    server = app.listen(0, () => {
      done();
    });
  });

  after((done) => {
    server.close(() => {
      done();
    });
  });

  it('should allow GET /health', async () => {
    const result = await request(server).get('/health');
    expect(result.status).to.equal(HttpStatus.OK);
    expect(result.body.status).to.equal('ok');
  });

  it('should allow GET /', async () => {
    const result = await request(server).get('/');
    expect(result.status).to.equal(HttpStatus.OK);
    expect(result.notFound).to.be.false;
  });

  it('should JSON 404 on GET /test/doesnotexist', async () => {
    const result = await request(server)
        .get('/test/doesnotexist')
        .set('Accept', 'application/json');
    expect(result.status).to.equal(HttpStatus.NOT_FOUND);
    expect(result.body.status).to.equal('error');
    expect(result.body.error).to.equal('Not found');
    expect(result.notFound).to.be.true;
  });

  it('should 404 on GET /test/doesnotexist', async () => {
    const result = await request(server)
        .get('/test/doesnotexist')
        .set('Accept', 'text/html');
    expect(result.status).to.equal(HttpStatus.NOT_FOUND);
    expect(result.notFound).to.be.true;
  });

  it('should 500 on GET /test/error', async () => {
    const result = await request(server).get('/test/error');
    expect(result.status).to.equal(HttpStatus.INTERNAL_SERVER_ERROR);
    expect(result.body.status).to.equal('error');
    expect(result.body.error).to.equal('something went wrong');
  });

  it('should JSON 500 on JSON GET /test/exception', async () => {
    const result = await request(server)
        .get('/test/exception')
        .set('Accept', 'application/json');
    expect(result.status).to.equal(HttpStatus.INTERNAL_SERVER_ERROR);
    expect(result.body.status).to.equal('error');
    expect(result.body.error).to.equal('something went wrong');
  });

  it('should 500 on GET /test/exception', async () => {
    const result = await request(server)
        .get('/test/exception')
        .set('Accept', 'text/html');
    expect(result.status).to.equal(HttpStatus.INTERNAL_SERVER_ERROR);
    expect(result.text).to.equal('something went wrong');
  });
});
