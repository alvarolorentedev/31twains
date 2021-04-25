const uuidMock = jest.fn();
jest.mock('uuid', () => ({
  v4: uuidMock,
}));
import * as faker from 'faker';
import { generateTokenForUser, getUserFromToken, isTokenValid, updateTokenUsageCount, _ } from '../../src/repository/token';

describe('token should', () => {
  beforeEach(() => {
    _.userStore = {}
  });
  describe('generateTokenForUser should', () => {
    test('return new token for new user', async () => {
      const expectedToken = faker.datatype.uuid();
      uuidMock.mockReturnValue(expectedToken);
      const expectedUser = faker.random.word();
      const result = generateTokenForUser(expectedUser);
      expect(result).toEqual(expectedToken);
      expect(_.userStore[expectedToken].count).toEqual(0);
      expect(_.userStore[expectedToken].user).toEqual(expectedUser);
      expect(_.userStore[expectedToken].validUntil).not.toBeFalsy();
    });
  });

  describe('getUserFromToken should', () => {

    test('return username for exiting token', async () => {
      const expectedToken = faker.datatype.uuid();
      const expectedUser = faker.random.word();
      _.userStore[expectedToken] = {
        user: expectedUser,
        count: 0,
        validUntil: 0
      }
      expect(getUserFromToken(expectedToken)).toBe(expectedUser)
    });
    test('throw for non exiting token', async () => {
      expect(() => getUserFromToken(faker.datatype.uuid())).toThrowError()
    });
  });
  describe('updateTokenUsageCount should', () => {

    test('increase token count', async () => {
      const expectedToken = faker.datatype.uuid();
      const expectedUser = faker.random.word();
      _.userStore[expectedToken] = {
        user: expectedUser,
        count: 0,
        validUntil: 0
      }
      updateTokenUsageCount(expectedToken)
      expect(_.userStore[expectedToken].count).toBe(1)
    });
  });
  describe('isTokenValid should', () => {

    test('be true if count bellow 5 and validUntil in the future', async () => {
      const expectedToken = faker.datatype.uuid();
      const expectedUser = faker.random.word();
      _.userStore[expectedToken] = {
        user: expectedUser,
        count: 4,
        validUntil: new Date().getTime() + 300000
      }
      
      expect(isTokenValid(expectedToken)).toBe(true)
    });
    test('be false if count equal or over 5', async () => {
      const expectedToken = faker.datatype.uuid();
      const expectedUser = faker.random.word();
      _.userStore[expectedToken] = {
        user: expectedUser,
        count: 5,
        validUntil: new Date().getTime() + 300000
      }
      
      expect(isTokenValid(expectedToken)).toBe(false)
    });
    test('be false if validUntil in the past', async () => {
      const expectedToken = faker.datatype.uuid();
      const expectedUser = faker.random.word();
      _.userStore[expectedToken] = {
        user: expectedUser,
        count: 0,
        validUntil: new Date().getTime() - 300000
      }
      
      expect(isTokenValid(expectedToken)).toBe(false)
    });
  });
  
  
});


