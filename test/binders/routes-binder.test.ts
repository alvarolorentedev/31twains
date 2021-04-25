jest.mock('../../src/controllers/authorization', () => ({
  authorization: jest.fn(),
}));

import { authorization } from '../../src/controllers/authorization';
import { routesMiddleware } from '../../src/binders/routes-binder';
describe('route binder', () => {
  test('should add authorization path', async () => {
    const appMock = {
      use: jest.fn(),
    };
    //@ts-ignore
    routesMiddleware(appMock);

    expect(appMock.use).toBeCalledWith('/auth', authorization);
  });
});
