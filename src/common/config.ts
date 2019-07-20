
const os = require('os');

function environmentVariables() {
  const NODE_ENV: string = process.env['NODE_ENV'] || 'local';
  const HOSTNAME: string = process.env['HOSTNAME'] || os.hostname();
  const LOGGLY_TOKEN: string | undefined = process.env['LOGGLY_TOKEN'];
  const NPM_PACKAGE_VERSION: string = process.env['npm_package_version'] || '';
  const PORT: number = parseInt(process.env['PORT'] || '8080', 10);

  return {
    NODE_ENV,
    HOSTNAME,
    LOGGLY_TOKEN,
    NPM_PACKAGE_VERSION,
    PORT,
  };
}

export {environmentVariables};
