const generateTokenForUserMock = jest.fn();

jest.mock('../../src/repository/token', () => ({
  generateTokenForUser: generateTokenForUserMock,
}));
import * as faker from 'faker';
import { app } from '../../src/app';
import * as request from 'supertest';

describe('authorization get should', () => {
  test('return 200 with token if correct authorization headers are sent on correct path', async () => {
    const expectedToken = faker.datatype.uuid();
    generateTokenForUserMock.mockReturnValue(expectedToken);
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
    expect(generateTokenForUserMock).toBeCalledWith(process.env.USERNAME);
    expect(result.body).toEqual({ token: expectedToken });
  });
});
