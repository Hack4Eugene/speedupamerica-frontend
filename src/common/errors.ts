const errInvalidArgs = new Error('Invalid args');
const errMissingConnDetails = new Error('database connection details missing');
const errSubmissionCreate = new Error('Submission Create (Connection)');
const errConnectionRefused = new Error('ECONNREFUSED');
const errDefault = new Error('something went wrong');

export {
  errMissingConnDetails,
  errInvalidArgs,
  errSubmissionCreate,
  errConnectionRefused,
  errDefault,
};
