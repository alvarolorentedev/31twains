import { Application } from 'express';
import logger from '../utils/logger';
import * as morgan from 'morgan';
import * as helmet from 'helmet';
import { authorization } from '../middleware/authorization';

class LoggingStream {
  write(text: string) {
    logger.info(text);
  }
}

export const middlewareBinder = (app: Application): void => {
  app.use(helmet());
  app.use(authorization);
  app.use(morgan('tiny', { stream: new LoggingStream() }));
};
