import {
  getConnectionDetails,
  errMissingConnDetails,
} from '../../src/dal/connection';
import {expect} from 'chai';

describe('DB connection logic', () => {
  describe('getConnectionDetails()', () => {
    const env = Object.assign({}, process.env);

    after(() => {
      process.env = env;
    });

    beforeEach(() => {
      process.env = {
        'DB_HOSTNAME': 'DB_HOSTNAME',
        'DB_PORT': 'DB_PORT',
        'DB_USERNAME': 'DB_USERNAME',
        'DB_PASSWORD': 'DB_PASSWORD',
        'DB_NAME': 'DB_NAME',
      };
    });

    it('should get count of submissions', async () => {
      const details = getConnectionDetails();
      expect(details.host).to.equal('DB_HOSTNAME');
      expect(details.port).to.equal('DB_PORT');
      expect(details.user).to.equal('DB_USERNAME');
      expect(details.password).to.equal('DB_PASSWORD');
      expect(details.database).to.equal('DB_NAME');
      expect(details.connectionLimit).to.equal(10);
    });

    it('should return error if missing host', async () => {
      delete process.env.DB_HOSTNAME;
      expect(() => {
        getConnectionDetails();
      }).to.throw(errMissingConnDetails);
    });

    it('should return error if missing port', async () => {
      delete process.env.DB_PORT;
      expect(() => {
        getConnectionDetails();
      }).to.throw(errMissingConnDetails);
    });

    it('should return error if missing user', async () => {
      delete process.env.DB_USERNAME;
      expect(() => {
        getConnectionDetails();
      }).to.throw(errMissingConnDetails);
    });

    it('should return error if missing password', async () => {
      delete process.env.DB_PASSWORD;
      expect(() => {
        getConnectionDetails();
      }).to.throw(errMissingConnDetails);
    });

    it('should return error if missing db name', async () => {
      delete process.env.DB_NAME;
      expect(() => {
        getConnectionDetails();
      }).to.throw(errMissingConnDetails);
    });
  });
});
