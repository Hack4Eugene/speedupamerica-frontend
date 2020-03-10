import {Response, Request} from 'express';
import * as HttpStatus from 'http-status-codes';

function index(_req:Request, res:Response) {
  res.status(HttpStatus.OK).render('home');
}

function robots(_req:Request, res:Response) {
  res.status(HttpStatus.OK).render('robots', {layout: false});
}

export {index, robots};
