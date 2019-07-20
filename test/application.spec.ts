import {app} from '../src/application';
import {expect} from 'chai';
import * as request from 'supertest';

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
    expect(result.status).to.equal(200);
    expect(result.body.status).to.equal('ok');
  });

  it('should allow GET /', async () => {
    const result = await request(server).get('/');
    expect(result.status).to.equal(200);
    expect(result.text).to.equal('home');
  });

  it('should should JSON 404 on GET /test/doesnotexist', async () => {
    const result = await request(server)
      .get('/test/doesnotexist')
      .set('Accept', 'application/json');
    expect(result.status).to.equal(404);
    expect(result.body.status).to.equal('error');
    expect(result.body.error).to.equal('not found');
  });

  it('should should 404 on GET /test/doesnotexist', async () => {
    const result = await request(server)
      .get('/test/doesnotexist')
      .set('Accept', 'text/html');
    expect(result.status).to.equal(404);
    expect(result.text).to.equal('Not found');
  });

  it('should should 500 on GET /test/error', async () => {
    const result = await request(server).get('/test/error');
    expect(result.status).to.equal(500);
    expect(result.body.status).to.equal('error');
    expect(result.body.error).to.equal('something went wrong');
  });

  it('should should JSON 500 on JSON GET /test/exception', async () => {
    const result = await request(server)
      .get('/test/exception')
      .set('Accept', 'application/json');
    expect(result.status).to.equal(500);
    expect(result.body.status).to.equal('error');
    expect(result.body.error).to.equal('something went wrong');
  });

  it('should should 500 on GET /test/exception', async () => {
    const result = await request(server)
      .get('/test/exception')
      .set('Accept', 'text/html');
    expect(result.status).to.equal(500);
    expect(result.text).to.equal('something went wrong');
  });
});
