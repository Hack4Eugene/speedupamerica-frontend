import {Response, Request} from 'express';
import * as HttpStatus from 'http-status-codes';

function index(_req:Request, res:Response) {
  res.status(HttpStatus.OK).end('home');
}

export {index};
