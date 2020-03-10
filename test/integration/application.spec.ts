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
    expect(result.text.includes('Home')).to.be.true;
  });

  it('should allow GET /robots.txt', async () => {
    const result = await request(server).get('/robots.txt');
    expect(result.status).to.equal(HttpStatus.OK);
    expect(result.text).to.have.string('User-agent');
    expect(result.text).to.not.have.string('<body>');
    expect(result.type).to.equal('text/plain');
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

  describe('Development environment', () => {
    const originalIsProduction:boolean = app.locals.isProduction;

    before(() => {
      // This isn't a perfect test method, since we're setting `isProduction`
      // directly instead of letting the app set it based on NODE_ENV,
      // but this method does verify the resulting template behavior.
      app.locals.isProduction = false;

      // The app doesn't seem to respond to changing the following on the fly:
      // process.env.NODE_ENV = 'development';
      // app.set('env', 'development');
    });

    after(() => {
      app.locals.isProduction = originalIsProduction;
    });

    it('should disallow crawlers with /robots.txt', async () => {
      const result = await request(server).get('/robots.txt');
      expect(result.text).to.have.string('Disallow: /');
      expect(result.text).to.not.have.string('Allow');
    });

    it('should disallow crawlers in home page HTML', async () => {
      const result = await request(server).get('/');
      expect(result.text).to.have.string(
          '<meta name="robots" content="noindex, nofollow">'
      );
    });
  });

  describe('Production environment', () => {
    const originalIsProduction:boolean = app.locals.isProduction;

    before(() => {
      app.locals.isProduction = true;
      // process.env.NODE_ENV = 'production';
      // app.set('env', 'production');
    });

    after(() => {
      app.locals.isProduction = originalIsProduction;
    });

    it('should allow crawlers with /robots.txt', async () => {
      const result = await request(server).get('/robots.txt');
      expect(result.text).to.have.string('Allow: /');
      expect(result.text).to.not.have.string('Disallow');
    });

    it('should not have <meta name="robots"> in home page HTML', async () => {
      const result = await request(server).get('/');
      expect(result.text).to.not.have.string('<meta name="robots"');
    });
  });
});
