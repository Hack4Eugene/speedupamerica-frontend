const mysql = require('mysql2/promise');

const opts = getConnectionDetails();
const pool = mysql.createPool(opts);

function getConnectionDetails() {
  const host = process.env['DB_HOSTNAME'];
  const port = process.env['DB_PORT'];
  const user = process.env['DB_USERNAME'];
  const password = process.env['DB_PASSWORD'];
  const database = process.env['DB_NAME'];

  if (!host || !port || !user || !password || !database) {
    throw new Error('database connection details missing');
  }

  return {
    host,
    port,
    user,
    password,
    database,
    connectionLimit: 10,
  };
}

export {pool, getConnectionDetails};
