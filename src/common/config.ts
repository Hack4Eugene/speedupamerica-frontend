
function getEnvironmentVariables() {
  const env:string | undefined = process.env['NODE_ENV'];
  const logglyToken: string | undefined = process.env['LOGGLY_TOKEN'];

  return {
    env,
    logglyToken,
  };
}

export {getEnvironmentVariables};
