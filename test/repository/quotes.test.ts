import {
  getQuoteForUserById,
  getQuotesForUser,
} from '../../src/repository/quotes';
import * as faker from 'faker';
import * as data from '../../quotes.json';
describe('quotes repository should', () => {
  describe('getQuotesForUser should', () => {
    test('return quotes for existing user', () => {
      expect(getQuotesForUser(process.env.USERNAME)).toEqual(data);
    });
    test('throws for non existing user', () => {
      expect(() => getQuotesForUser(faker.random.word())).toThrow();
    });
  });
  describe('getQuoteForUserById should', () => {
    const randomIndex = Math.floor(Math.random() * 31);
    test('return quotes for user', () => {
      expect(
        getQuoteForUserById(process.env.USERNAME, data[randomIndex].id)
      ).toEqual(data[randomIndex]);
    });
    test('throw if id user does not exist', () => {
      expect(() =>
        getQuoteForUserById(faker.random.word(), data[randomIndex].id)
      ).toThrow();
    });
    test('throw if id does not exist', () => {
      expect(() =>
        getQuoteForUserById(process.env.USERNAME, faker.random.word())
      ).toThrow();
    });
  });
});
