jest.mock('../../src/controllers/authorization', () => ({
  authorization: jest.fn(),
}));
jest.mock('../../src/controllers/quotes', () => ({
  quotes: jest.fn(),
}));
jest.mock('../../src/controllers/share', () => ({
  share: jest.fn(),
}));

import { authorization } from '../../src/controllers/authorization';
import { quotes } from '../../src/controllers/quotes';
import { share } from '../../src/controllers/share';
import { routesBinder } from '../../src/binders/routes-binder';
import { Application } from 'express';
describe('route binder', () => {
  test('should add authorization path', async () => {
    const appMock = ({
      use: jest.fn(),
    } as unknown) as Application;

    routesBinder(appMock);

    expect(appMock.use).toBeCalledWith('/auth', authorization);
  });
  test('should add quotes path', async () => {
    const appMock = ({
      use: jest.fn(),
    } as unknown) as Application;

    routesBinder(appMock);

    expect(appMock.use).toBeCalledWith('/quotes', quotes);
  });
  test('should add share path', async () => {
    const appMock = ({
      use: jest.fn(),
    } as unknown) as Application;

    routesBinder(appMock);

    expect(appMock.use).toBeCalledWith('/share', share);
  });
});
