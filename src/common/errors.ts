const errInvalidArgs = new Error('Invalid args');
const errMissingConnDetails = new Error('database connection details missing');
const errSubmissionCreate = new Error('Submission Create (Connection)');
const errConnectionRefused = new Error('ECONNREFUSED');

export {
  errMissingConnDetails,
  errInvalidArgs,
  errSubmissionCreate,
  errConnectionRefused,
};
