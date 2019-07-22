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
};

// Winston Logger
// Send message to STDOUT (console) if in development env.
const base = createLogger({
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
  base.add(new Loggly({
    token: LOGGLY_TOKEN,
    subdomain: `speedupamerica`, // @TODO get from env vars
    json: true,
    timestamp: true,
  }));
}

// Bug (https://github.com/winstonjs/winston/issues/1596) in Winston
// prevents overriding default metadata in a child. Create base logger
// w/o type and instead expose child with type. This allows additional
// children (access log) to have a different type.
const logging = base.child({type: 'app'});

export {logging, base};
