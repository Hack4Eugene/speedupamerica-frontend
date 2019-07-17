
function getEnvironmentVariables() {
  const env: string = process.env['NODE_ENV'] || 'local';
  const logglyToken: string | undefined = process.env['LOGGLY_TOKEN'];

  return {
    env,
    logglyToken,
  };
}

export {getEnvironmentVariables};
