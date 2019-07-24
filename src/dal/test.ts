import {getCount} from './submissions';

function testConnection(): void {
  console.log(process.env['DB_HOSTNAME'])
  console.log(process.env['DB_PORT']);
  console.log(process.env['DB_USERNAME']);
  console.log(process.env['DB_PASSWORD']);
  console.log(process.env['DB_NAME']);
  setInterval(() => {
    getCount().then((count) => {
      console.log(count);
    }).catch((err) => {
      console.error(err);
    });
  }, 1000);
}

export {testConnection};
