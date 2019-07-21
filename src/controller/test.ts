import {Response, Request} from 'express';
import * as HttpStatus from 'http-status-codes';

function error(_req:Request, res:Response) {
  res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
    'status': 'error',
    'error': 'something went wrong',
  });
}

function exception(_req:Request, _res:Response) {
  throw new Error('something went wrong');
}

export {error, exception};
