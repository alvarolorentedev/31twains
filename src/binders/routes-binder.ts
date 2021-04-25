import { Application } from 'express';
import { authorization } from '../routes/authorization';

export const routesMiddleware = (app: Application): void => {
  app.use('/auth', authorization);
};
