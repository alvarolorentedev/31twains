const uuidMock = jest.fn();
jest.mock('uuid', () => ({
  v4: uuidMock,
}));
import * as faker from 'faker';
import {
  createLinkToQuote,
  getQuoteFromLink,
  _,
} from '../../src/repository/share';

describe('token should', () => {
  beforeEach(() => {
    _.quotesLinksStore = {};
  });
  describe('createLinkToQuote should', () => {
    test('return new quoteId for new quote', async () => {
      const expectedId = faker.datatype.uuid();
      uuidMock.mockReturnValue(expectedId);
      const expectedQuote = faker.random.words();
      const result = createLinkToQuote(expectedQuote);
      expect(result).toEqual(expectedId);
      expect(_.quotesLinksStore[expectedId]).toEqual(expectedQuote);
    });
  });

  describe('getQuoteFromLink should', () => {
    test('return quote for exiting id', async () => {
      const expectedId = faker.datatype.uuid();
      const expectedQuote = faker.random.words();
      _.quotesLinksStore[expectedId] = expectedQuote;
      expect(getQuoteFromLink(expectedId)).toBe(expectedQuote);
    });
    test('throw for non exiting id', async () => {
      expect(() => getQuoteFromLink(faker.datatype.uuid())).toThrowError();
    });
  });
});
