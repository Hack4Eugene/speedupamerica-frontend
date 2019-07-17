import {createLogger, format, transports} from 'winston';
import {environmentVariables} from './config';
import winston = require('winston');
const {Loggly} = require('winston-loggly-bulk');

const {
  NODE_ENV,
  LOGGLY_TOKEN,
  DB_HOSTNAME,
  NPM_PACKAGE_VERSION
} = environmentVariables();

// Winston Logger
// Send message to STDOUT (console) if in development env.
const logging =
  createLogger({
    level: NODE_ENV === 'development' ? 'debug' : 'info',
    defaultMeta: {service: 'speedupamerica-frontend'},
    exitOnError: false,
    format: format.combine(
        format.printf(({level, timestamp, message}) => {
          return `summary: ${level} ${timestamp} ${NODE_ENV}: ${message}`;
        }),
        format.timestamp(),
        format.json(),
        format.printf(() => {
          return `env: ${NODE_ENV}`;
        }),
        format.printf(() => {
          return 'type: application/json';
        }),
        format.printf(({level}) => {
          return `severity: ${level}`;
        }),
    ),
    transports: [
      new transports.Console({
        level: 'debug',
        format: format.combine(
          format.colorize(),
          format.printf(({level, timestamp, message}) => {
            return `summary: ${level} ${timestamp} ${NODE_ENV}: ${message}`;
          }),
        ),
        stderrLevels: ['error', 'debug'],
        consoleWarnLevels: ['warn', 'debug'],
      }),
    ],
  });

// Configure Loggly if valid LOGGLY_TOKEN
if (!LOGGLY_TOKEN) {
  winston.add(new Loggly({
    level: 'debug',
    token: LOGGLY_TOKEN,
    tags: ['NodeJS'],
    subdomain: `https://logs-01.loggly.com/inputs/${LOGGLY_TOKEN}/tag/speedupamerica-v2`,
    json: true,
    format: format.combine(
        format.printf(({level, timestamp, message}) => {
          return `summary: ${level} ${timestamp} ${NODE_ENV}: ${message}`;
        }),
        format.timestamp(),
        format.json(),
        format.printf(() => {
          return `env: ${NODE_ENV}`;
        }),
        format.printf(() => {
          return 'type: application/json';
        }),
        format.printf(({level}) => {
          return `severity: ${level}`;
        }),
        format.printf(() => {
          return `hostname: ${DB_HOSTNAME}`;
        }),
        format.printf(() => {
          return `packageVersion: ${NPM_PACKAGE_VERSION}`;
        })
    ),
  }));
}

export {logging};
