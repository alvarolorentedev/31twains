const uuidMock = jest.fn();
jest.mock('uuid', () => ({
  v4: uuidMock,
}));
import * as faker from 'faker';
import { generateTokenForUser } from '../../src/repository/token';

describe('token Manager should', () => {
  test('return new token for new user', async () => {
    const expectedToken = faker.datatype.uuid();
    uuidMock.mockReturnValue(expectedToken);
    const expectedUser = faker.random.word();
    const result = generateTokenForUser(expectedUser);
    expect(result).toEqual(expectedToken);
  });
});
