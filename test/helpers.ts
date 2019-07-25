import * as sinon from 'sinon';

function stubRequest(): any  {
  const req:any = {}

  return req as Request;
};

function stubResponse(): any {
  const res:any = {};
  res.status = sinon.stub().returns(res);
  res.json = sinon.stub().returns(res);
  res.end = sinon.stub().returns(res);

  return res as Response;
};


export {stubRequest, stubResponse}
