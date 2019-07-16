import {testConnection} from './dal/test';
import { Logging } from '../src/common/Logging';

// Temp, just here to demonstrate connection
// Delete when we setup Express or whatever router we use
testConnection();

// Delete when we use Logging for requests.
let logging: Logging = new Logging();
logging.log('Starting', []);
logging.log('Stopping', []);
