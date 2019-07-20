import {Response, Request} from 'express'

function health(_req:Request, res:Response) {
  res.status(200).json({'status': 'ok'});
}

export {health};
