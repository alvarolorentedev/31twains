const getQuoteFromLinkMock = jest.fn();

jest.mock('../../src/repository/share', () => ({
  getQuoteFromLink: getQuoteFromLinkMock,
}));
import * as faker from 'faker';
import { app } from '../../src/app';
import * as request from 'supertest';

describe('share get should', () => {
  test('return 200 with quote for correct link', async () => {
    const expectedShareId = faker.datatype.uuid();
    const expectedQuote = faker.random.words();
    getQuoteFromLinkMock.mockReturnValue(expectedQuote);
    const result = await request(app).get(`/share/${expectedShareId}`).send();
    expect(result.status).toEqual(200);
    expect(getQuoteFromLinkMock).toBeCalledWith(expectedShareId);
    expect(result.body).toEqual({ quote: expectedQuote });
  });
  test('return 405 if wrong methid', async () => {
    const expectedShareId = faker.datatype.uuid();
    const expectedQuote = faker.random.words();
    getQuoteFromLinkMock.mockReturnValue(expectedQuote);
    const result = await request(app).post(`/share/${expectedShareId}`).send();
    expect(result.status).toEqual(405);
  });
});
