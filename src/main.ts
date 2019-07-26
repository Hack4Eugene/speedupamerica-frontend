import {logging, base} from './common/logging';
import {environmentVariables} from './common/config';
import {pool} from './dal/connection';
import {app} from './application';

const config = environmentVariables();

logging.info('Starting server');

const server = app.listen(config.PORT, () => {
  logging.info(`Server started on ${config.PORT}`);
}).on('error', (err) => {
  logging.error('Server error', {
    error: err.message,
    stack: err.stack,
  });
});

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

function shutdown() {
  logging.info('Shutting down server');

  // @TODO flip healthcheck and wait 5 seconds

  server.close((err) => {
    if (err) {
      logging.error('Problem shutting server down', {
        error: err.message,
        stack: err.stack,
      });
    } else {
      logging.info('Server has been stopped');
    }

    // @TODO Close DB connection
    pool.end((err:Error) => {
      if (err) {
        logging.error('Problem closing DB connection pool ', {
          error: err.message,
          stack: err.stack,
        });
      } else {
        logging.info('DB connection pool closed');
      }

      // Close logger
      base.close();

      process.exit(0);
    });
  });
}
