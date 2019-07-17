
function getEnvironmentVariables() {
  let env = process.env['NODE_ENV'];
  let logglyToken = process.env['LOGGLY_TOKEN'];

  return {
    env,
    logglyToken
  }
}

export {getEnvironmentVariables};
