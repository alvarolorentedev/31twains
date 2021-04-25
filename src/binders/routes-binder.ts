import { Application } from 'express';
import { authorization } from '../controllers/authorization';
import { quotes } from '../controllers/quotes';

export const routesMiddleware = (app: Application): void => {
  app.use('/auth', authorization);
  app.use('/quotes', quotes);
};