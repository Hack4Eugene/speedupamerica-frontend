import {testConnection} from './dal/test';
import {logging} from './common/logging';

// Temp, just here to demonstrate connection
// Delete when we setup Express or whatever router we use
testConnection();

// Delete when we use Logging for requests.
// (message.level, message, additionalInfo)
logging.log('error', 'Starting main.ts', []);
logging.log('error', 'Stopping main.ts', []);
