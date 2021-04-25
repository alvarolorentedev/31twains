const getQuotesForUserMock = jest.fn();
const getUserFromTokenMock = jest.fn();

jest.mock('../../src/repository/quotes', () => ({
  getQuotesForUser: getQuotesForUserMock,
}));
jest.mock('../../src/repository/token', () => ({
  getUserFromToken: getUserFromTokenMock,
  isTokenValid: () => true,
  updateTokenUsageCount: () => {
    //don't do anything in test
  },
}));

import * as faker from 'faker';
import { app } from '../../src/app';
import * as request from 'supertest';

describe('quote get should', () => {
  test('return 200 with quotes for user token', async () => {
    const expectedToken = faker.datatype.uuid();
    const expectedUser = faker.random.word();
    const expectedQuotes = [faker.random.words(), faker.random.words()];
    getUserFromTokenMock.mockReturnValue(expectedUser);
    getQuotesForUserMock.mockReturnValue(expectedQuotes);
    const result = await request(app)
      .get(`/quotes`)
      .set('Authorization', `Bearer ${expectedToken}`)
      .send();
    expect(result.status).toEqual(200);
    expect(getQuotesForUserMock).toBeCalledWith(expectedUser);
    expect(result.body).toEqual({
      user: expectedUser,
      quotes: expectedQuotes,
    });
  });
});
