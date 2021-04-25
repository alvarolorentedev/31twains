const getQuotesForUserMock = jest.fn();
const getQuoteForUserByIdMock = jest.fn();
const getUserFromTokenMock = jest.fn();

jest.mock('../../src/repository/quotes', () => ({
  getQuotesForUser: getQuotesForUserMock,
  getQuoteForUserById: getQuoteForUserByIdMock,
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

describe('quote get by id should', () => {
  test('return 200 with correct quote if exists', async () => {
    const expectedToken = faker.datatype.uuid();
    const expectedUser = faker.random.word();
    const expectedQuoteId = faker.random.word();
    const expectedQuote = faker.random.words();
    getUserFromTokenMock.mockReturnValue(expectedUser);
    getQuoteForUserByIdMock.mockReturnValue({
      id: expectedQuoteId,
      quote: expectedQuote
    });
    const result = await request(app)
      .get(`/quotes/${expectedQuoteId}`)
      .set('Authorization', `Bearer ${expectedToken}`)
      .send();
    expect(result.status).toEqual(200);
    expect(getQuoteForUserByIdMock).toBeCalledWith(expectedUser, expectedQuoteId);
    expect(result.body).toEqual({
      id: expectedQuoteId,
      quote: expectedQuote
    });
  });
  
});