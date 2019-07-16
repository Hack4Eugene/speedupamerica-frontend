import * as winston from 'winston';
import { getEnv } from '../helper/config';

export class Logging {
    private logger: winston.Logger;
    private level: string = getEnv() === 'production' ? 'debug' : 'info';

    private constructor() {
        this.logger = winston.createLogger({
            level: this.level,
            defaultMeta: { service: 'speedupamerica-frontend'},
            format: winston.format.combine(
                winston.format.label({ label:  getEnv()}),
                winston.format.timestamp(),
                winston.format.json(),
                winston.format.printf(() => {
                    return `ENV: ${getEnv()}`;
                }),
                winston.format.printf(() => {
                    return 'type: application';
                })
            ),
            transports: [
                new winston.transports.Console({
                    format: winston.format.simple(),
                    stderrLevels: ['error'],
                    consoleWarnLevels: ['warn', 'debug', 'info']
                })
            ]
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