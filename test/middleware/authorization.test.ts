import * as express from 'express';
import * as faker from 'faker';
import { assert } from 'node:console';
import * as request from 'supertest';
import { Request, Response } from 'express';
import { authorization } from '../../src/middlerware/authorization';

describe('basic auth on auth endpoint', () => {
  const expectedUser = process.env.USERNAME;
  const app = express();
  beforeAll(() => {
    app.use(authorization);
    app.get('/', (req: Request, res: Response) => {
      //@ts-ignore
      expect(req.user).toEqual(expectedUser);
      res.sendStatus(200);
    });
  });

  test('return 401 if no authorization headers are sent', async () => {
    const result = await request(app).get('/auth').send();
    expect(result.status).toEqual(401);
  });
  test('return 401 from endpoint if incorrect authorization headers are sent', async () => {
    const result = await request(app)
      .get(`/`)
      .set(
        'Authorization',
        `Basic ${Buffer.from(
          `${faker.random.word()}:${faker.random.word()}`,
          'utf-8'
        ).toString('base64')}`
      )
      .send();
    expect(result.status).toEqual(401);
  });
  test('return response from endpoint if correct authorization headers are sent', async () => {
    const result = await request(app)
      .get(`/`)
      .set(
        'Authorization',
        `Basic ${Buffer.from(
          `${process.env.USERNAME}:${process.env.PASSWORD}`,
          'utf-8'
        ).toString('base64')}`
      )
      .send();
    expect(result.status).toEqual(200);
  });
});
