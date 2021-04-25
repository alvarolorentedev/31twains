import { Application } from 'express';
import { authorization } from '../controllers/authorization';

export const routesMiddleware = (app: Application): void => {
  app.use('/auth', authorization);
};
