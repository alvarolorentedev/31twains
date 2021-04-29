import { Application } from 'express';
import logger from '../utils/logger';
import * as morgan from 'morgan';
import * as helmet from 'helmet';
import { authorization } from '../middleware/authorization';
import { errorHandler } from '../middleware/error-handler';

class LoggingStream {
  write(text: string) {
    logger.info(text);
  }
}

export const preMiddlewareBinder = (app: Application): void => {
  app.use(helmet());
  app.use(morgan('tiny', { stream: new LoggingStream() }));
  app.use(authorization);
};

export const postMiddlewareBinder = (app: Application): void => {
  app.use(errorHandler);
};
