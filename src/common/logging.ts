import {createLogger, format, transports} from 'winston';
import {environmentVariables} from './config';
const {Loggly} = require('winston-loggly-bulk');

const {
  NODE_ENV,
  LOGGLY_TOKEN,
  HOSTNAME,
} = environmentVariables();
const level = NODE_ENV === 'development' ? 'debug' : 'info';
const metadata = {
  service: 'speedupamerica-frontend',
  env: NODE_ENV,
  hostname: HOSTNAME,
  type: 'app',
};

// Winston Logger
// Send message to STDOUT (console) if in development env.
const logging =
  createLogger({
    level: level,
    defaultMeta: metadata,
    exitOnError: false,
    format: format.combine(
        format.timestamp(),
        format.json(),
    ),
    transports: [
      new transports.Console(),
    ],
  });

// Configure Loggly if valid LOGGLY_TOKEN
if (LOGGLY_TOKEN) {
  logging.add(new Loggly({
    token: LOGGLY_TOKEN,
    tags: ['NodeJS'],
    subdomain: `https://logs-01.loggly.com/inputs/${LOGGLY_TOKEN}/tag/speedupamerica-v2`,
    json: true,
    timestamp: true,
  }));
}

export {logging};
