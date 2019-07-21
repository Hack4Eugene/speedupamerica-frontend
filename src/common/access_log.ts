import {Response, Request, NextFunction} from 'express';
import * as HttpStatus from 'http-status-codes';

import {base} from './logging';

export const logger = base.child({type: 'http'});

export const accessLogMiddleware = () => {
  return (req:Request, res:Response, next:NextFunction) => {
    const startTime = new Date();

    req.on('end', () => {
      const responseTime:number = new Date().getTime() - startTime.getTime();
      const statusCode:number = res.statusCode;
      const details:object = {
        response_time: responseTime,
        req: getRequestDetails(req),
        res: getResponseDetails(res),
      };

      if (statusCode >= HttpStatus.INTERNAL_SERVER_ERROR) {
        logger.error('request error', details);
        return;
      }

      logger.info('request complete', details);
    });

    next();
  };
};

const getRequestDetails = (req:Request):object => {
  return {
    remote_ip: req.ip,
    method: req.method,
    path: req.path,
  };
};

const getResponseDetails = (res:Response):object => {
  return {
    status_code: res.statusCode,
  };
};
