import {Response, Request} from 'express';

function error(_req:Request, res:Response) {
  res.status(500).json({'status': 'error', 'error': 'something went wrong'});
}

function exception(_req:Request, _res:Response) {
  throw new Error('something went wrong');
}

export {error, exception};
