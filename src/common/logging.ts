import {createLogger, format, transports} from 'winston';
import {getEnv} from '../helper/config';
const Sentry = require('winston-raven-sentry');

/**
 * Winston Log Object
 * Send logs to Console if message level <= 'error'.
 * Send logs to Sentry if message level is at least 'info'.
 */
const logging =
  createLogger({
    level: getEnv() === 'production' ? 'info' : 'debug',
    defaultMeta: {service: 'speedupamerica-frontend'},
    exitOnError: false,
    format: format.combine(
        format.timestamp(),
        format.json(),
        format.printf(() => {
          return `ENV: ${getEnv()}`;
        }),
        format.printf(() => {
          return 'type: application';
        }),
    ),
    transports: [
      new transports.Console({
        level: 'error',
        format: format.simple(),
        stderrLevels: ['error'],
        consoleWarnLevels: ['warn', 'debug', 'info'],
      }),
      new Sentry({
        dsn: 'https://34760911653f40a18ba07c39a6a37002@sentry.io/1488146',
        level: 'info',
      }),
    ],
  });

export {logging};
