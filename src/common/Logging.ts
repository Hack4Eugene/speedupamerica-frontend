import * as winston from 'winston';
import {getEnv} from '../helper/config';
const Sentry = require('winston-raven-sentry');

export class Logging {
    private logger: winston.Logger;
    private level: string = getEnv() === 'production' ? 'info' : 'debug';

    constructor() {
      this.logger = winston.createLogger({
        level: this.level,
        format: winston.format.combine(
            winston.format.label({label: getEnv()}),
            winston.format.timestamp(),
            winston.format.json(),
            winston.format.printf(() => {
              return `ENV: ${getEnv()}`;
            }),
            winston.format.printf(() => {
              return 'type: application';
            }),
        ),
        defaultMeta: {service: 'speedupamerica-frontend'},
        transports: [
          new winston.transports.Console({
            format: winston.format.simple(),
            stderrLevels: ['error'],
            consoleWarnLevels: ['warn', 'debug', 'info'],
          }),
          new Sentry({
            dsn: 'https://34760911653f40a18ba07c39a6a37002@sentry.io/1488146',
            level: 'info',
          }),
        ],
      });
    }

    log(msg: string, additionalInfo: any[]) {
        this.logger.log(this.level, msg, additionalInfo);
    }

    info(msg: string, ...additionalInfo: any[]) {
        this.logger.log('info', msg, additionalInfo);
        this.logger.info(msg, additionalInfo);
    }

    error(msg: string, additionalInfo: any[]) {
        this.logger.log('error', msg, additionalInfo);
        this.logger.error('error', msg, additionalInfo);
    }
}
