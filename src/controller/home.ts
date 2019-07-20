import {Response, Request} from 'express'

function index(_req:Request, res:Response) {
  res.status(200).end('home');
}

export {index};
