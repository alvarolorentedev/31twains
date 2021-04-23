import * as express from 'express';
import * as auth from 'express-basic-auth';
import * as cors from 'cors';
import logger from './utils/logger';
import * as morgan from 'morgan';

class MyStream {
  write(text: string) {
    logger.info(text);
  }
}
const stream = new MyStream();

const app = express();
app.use(cors());
app.use(
  auth({
    users: { [process.env.USERNAME]: process.env.PASSWORD },
  })
);
app.use(morgan('tiny', { stream }));

app.listen({ port: process.env.PORT || 8080 }, () =>
  console.log(
    `🚀 Server ready at http://localhost:${process.env.PORT || '8080'}`
  )
);
