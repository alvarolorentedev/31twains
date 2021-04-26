import * as express from 'express';
import { middlewareBinder } from './binders/middleware-binder';
import { routesBinder } from './binders/routes-binder';

export const app = express();

middlewareBinder(app);
routesBinder(app);
