import { Application } from 'express';
import { authorization } from '../controllers/authorization';
import { quotes } from '../controllers/quotes';
import { share } from '../controllers/share';

export const routesBinder = (app: Application): void => {
  app.use('/auth', authorization);
  app.use('/quotes', quotes);
  app.use('/share', share);
};
