import * as express from 'express';
import { handle } from 'express-exception-handler';
import {
  postMiddlewareBinder,
  preMiddlewareBinder,
} from './binders/middleware-binder';
import { routesBinder } from './binders/routes-binder';

handle();

export const app = express();

preMiddlewareBinder(app);
routesBinder(app);
postMiddlewareBinder(app);
