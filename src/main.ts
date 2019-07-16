import {testConnection} from './dal/test';
import { logging } from './common/logging';

// Temp, just here to demonstrate connection
// Delete when we setup Express or whatever router we use
testConnection();

// Delete when we use Logging for requests.
// (message.level, message, additionalInfo)
logging.log('info', 'Starting main.ts', []);
logging.log('info', 'Stopping main.ts', []);
