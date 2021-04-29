jest.mock('../../src/utils/logger', () => ({
  default: {
    error: jest.fn(),
    warn: jest.fn(),
  },
}));

import { exception } from 'express-exception-handler';
import { errorHandler } from '../../src/middleware/error-handler';
import * as faker from 'faker';
import { Response } from 'express';
import logger from '../../src/utils/logger';

describe('errorHandler', () => {
  test('should return expected error if extends from exception', () => {
    const response = ({
      status: jest.fn().mockImplementation(() => response),
      send: jest.fn(),
    } as unknown) as Response;
    const expectedMessage = faker.random.words();
    const error = new exception(expectedMessage, 400, {
      error: expectedMessage,
    });
    errorHandler(error, undefined, response, undefined);
    expect(logger.warn).toBeCalled();
    expect(response.status).toBeCalledWith(error.status);
    expect(response.send).toBeCalledWith({ error: error.message });
  });
  test('should return unexpected error if unhandle exception', () => {
    const response = ({
      status: jest.fn().mockImplementation(() => response),
      send: jest.fn(),
    } as unknown) as Response;
    const expectedMessage = faker.random.words();
    const error = new Error(expectedMessage);
    errorHandler(error, undefined, response, undefined);
    expect(logger.warn).toBeCalled();
    expect(response.status).toBeCalledWith(500);
    expect(response.send).toBeCalledWith({ error: 'Unexpected Error' });
  });
});
