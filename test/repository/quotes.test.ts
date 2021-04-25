import {
  getQuoteForUserById,
  getQuotesForUser,
} from '../../src/repository/quotes';
import * as faker from 'faker';
import * as data from '../../quotes.json';
describe('quotes repository should', () => {
  describe('getQuotesForUser should', () => {
    test('return quotes for user', () => {
      expect(getQuotesForUser('')).toEqual(data);
    });
  });
  describe('getQuoteForUserById should', () => {
    const randomIndex = Math.floor(Math.random() * 31);
    test('return quotes for user', () => {
      expect(getQuoteForUserById('', data[randomIndex].id)).toEqual(
        data[randomIndex]
      );
    });
    test('throw if id does not exist', () => {
      expect(() => getQuoteForUserById('', faker.random.word())).toThrow();
    });
  });
});
