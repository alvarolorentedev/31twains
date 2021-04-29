import { CustomRequest } from '../types/custom-request';
import { Response } from 'express';
import { ExceptionCustom } from 'express-exception-handler';
import logger from '../utils/logger';

export const errorHandler = (
  error: ExceptionCustom,
  _: CustomRequest,
  response: Response,
  __: () => void
): void => {
  const status = error.status || 500;
  if (status >= 500) logger.error(error);
  else logger.warning(error);
  response
    .status(error.status || 500)
    .send(error.response || { error: error.message });
};
