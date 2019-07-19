import {getCount} from './submissions';

function testConnection(): void {
  setInterval(() => {
    getCount().then((count) => {
      console.log(count);
    }).catch((err) => {
      console.error(err);
    });
  }, 1000);
}

export {testConnection}
