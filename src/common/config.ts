
function environmentVariables() {
  const NODE_ENV: string = process.env['NODE_ENV'] || 'local';
  const DB_HOSTNAME: string = process.env['NODE_ENV'] || 'localhost';
  const LOGGLY_TOKEN: string | undefined = process.env['LOGGLY_TOKEN'];
  const NPM_PACKAGE_VERSION: string = process.env['npm_package_version'] || '';

  return {
    NODE_ENV,
    DB_HOSTNAME,
    LOGGLY_TOKEN,
    NPM_PACKAGE_VERSION
  };
}

export {environmentVariables};
