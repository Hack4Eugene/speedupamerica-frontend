import {logging} from './common/logging';
import {environmentVariables} from './common/config';
import {app} from './application';

const config = environmentVariables();

logging.info('Starting server');

app.listen(config.PORT, () => {
  logging.info(`Server started on ${config.PORT}`);
});
