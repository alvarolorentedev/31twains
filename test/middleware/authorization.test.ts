const getUserFromTokenMock = jest.fn();
const isTokenValidMock = jest.fn();
const updateTokenUsageCountMock = jest.fn();

jest.mock('../../src/repository/token', () => ({
  getUserFromToken: getUserFromTokenMock,
  isTokenValid: isTokenValidMock,
  updateTokenUsageCount: updateTokenUsageCountMock,
}));
import * as express from 'express';
import * as faker from 'faker';
import * as request from 'supertest';
import { Request, Response } from 'express';
import { authorization } from '../../src/middleware/authorization';

describe('no auth in share endpoint', () => {
  const expectedUser = process.env.USERNAME;
  const app = express();
  beforeAll(() => {
    app.use(authorization);
    app.get('/share/:shareId', (req: Request, res: Response) => {
      //@ts-ignore
      res.sendStatus(200);
    });
  });

  test('return 200 with no authorization header', async () => {
    const result = await request(app)
      .get(`/share/${faker.datatype.uuid()}`)
      .send();
    expect(result.status).toEqual(200);
  });
});

describe('basic auth on auth endpoint', () => {
  const expectedUser = process.env.USERNAME;
  const app = express();
  beforeAll(() => {
    app.use(authorization);
    app.get('/auth', (req: Request, res: Response) => {
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
      .get(`/auth`)
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
      .get(`/auth`)
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
describe('bearer auth on quotes endpoint', () => {
  const expectedToken = faker.datatype.uuid();
  const expectedUser = faker.random.word();
  const app = express();
  beforeAll(() => {
    app.use(authorization);
    app.get('/quotes', (req: Request, res: Response) => {
      //@ts-ignore
      expect(req.user).toEqual(expectedUser);
      res.sendStatus(200);
    });
  });

  beforeEach(() => {
    updateTokenUsageCountMock.mockReset();
    getUserFromTokenMock.mockReset();
    isTokenValidMock.mockReset();
    getUserFromTokenMock.mockReturnValue(expectedUser);
    isTokenValidMock.mockReturnValue(true);
  });

  test('return 401 if no authorization headers are sent', async () => {
    const result = await request(app).get('/quotes').send();
    expect(result.status).toEqual(401);
    expect(updateTokenUsageCountMock).not.toBeCalled();
  });
  test('return 401 from endpoint if incorrect authorization headers are sent', async () => {
    getUserFromTokenMock.mockImplementation(() => {
      throw new Error('Kaboom');
    });
    const result = await request(app)
      .get(`/quotes`)
      .set('Authorization', `Bearer ${faker.datatype.uuid()}`)
      .send();
    expect(result.status).toEqual(401);
    expect(updateTokenUsageCountMock).not.toBeCalled();
  });
  test('return 401 from endpoint if correct authorization headers are sent but token is not valid', async () => {
    isTokenValidMock.mockReturnValue(false);
    const result = await request(app)
      .get(`/quotes`)
      .set('Authorization', `Bearer ${expectedToken}`)
      .send();
    expect(result.status).toEqual(401);
    expect(updateTokenUsageCountMock).not.toBeCalled();
  });
  test('return response from endpoint if correct authorization headers are sent', async () => {
    const result = await request(app)
      .get(`/quotes`)
      .set('Authorization', `Bearer ${expectedToken}`)
      .send();
    expect(result.status).toEqual(200);
    expect(updateTokenUsageCountMock).toBeCalledWith(expectedToken);
  });
});
