import {Response, Request} from 'express';
import * as HttpStatus from 'http-status-codes';

function health(_req:Request, res:Response) {
  res.status(HttpStatus.OK).json({'status': 'ok'});
}

export {health};
