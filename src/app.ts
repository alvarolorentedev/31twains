import * as express from 'express';
import * as cors from 'cors';
import logger from './utils/logger';
import * as morgan from 'morgan';
import * as helmet from 'helmet';
import { routesMiddleware } from "./binders/routes-binder";
import { authorization } from "./middlerware/authorization"

class MyStream {
  write(text: string) {
    logger.info(text);
  }
}
const stream = new MyStream();

export const app = express();
app.use(helmet());
app.use(cors());
app.use(authorization);
app.use(morgan('tiny', { stream }));

routesMiddleware(app)
