import {createLogger, format, transports} from 'winston';
const {Loggly} = require('winston-loggly-bulk');
import {getEnvironmentVariables} from './config';
import winston = require('winston');

/**
 * Winston Log Object
 * Send logs to Console if message level <= 'error'.
 * Send logs to Sentry if message level is at least 'info'.
 */
const envVariables = getEnvironmentVariables();
const NODE_ENV = envVariables.env;
const logging =
  createLogger({
    level: envVariables.env === 'production' ? 'error' : 'debug',
    defaultMeta: {service: 'speedupamerica-frontend'},
    exitOnError: false,
    format: format.combine(
        format.timestamp(),
        format.json(),
        format.printf(() => {
          return `ENV: ${NODE_ENV}`;
        }),
        format.printf(() => {
          return 'type: application';
        }),
    ),
    transports: [
      new transports.Console({
        level: 'debug',
        format: format.simple(),
        stderrLevels: ['error'],
        consoleWarnLevels: ['warn', 'debug', 'info'],
      }),
    ],
  });

if (!envVariables.logglyToken) {
  winston.add(new Loggly({
    level: 'debug',
    token: envVariables.logglyToken,
    tags: ['NodeJS'],
    subdomain: `https://logs-01.loggly.com/inputs/${envVariables.logglyToken}/tag/speedupamerica-v2`,
    json: true,
    format: format.combine(
        format.printf(({level, timestamp, message}) => {
          return `summary: ${level} ${timestamp} ${NODE_ENV}: ${message}`;
        }),
        format.printf(({level}) => {
          return `severity: ${level}`;
        }),
        format.timestamp(),
        format.json(),
        format.printf(() => {
          return `env: ${NODE_ENV}`;
        }),
        format.printf(() => {
          return 'type: application/json';
        }),
    ),
  }));
}

export {logging};
