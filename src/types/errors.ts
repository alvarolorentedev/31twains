import { exception } from 'express-exception-handler';

class BaseExpectedError extends exception {
  constructor(message: string) {
    super(message, 400, { error: message });
  }
}

export class NotFoundError extends BaseExpectedError {
  constructor(message: string) {
    super(message);
  }
}

export class InvalidToken extends BaseExpectedError {
  constructor(message: string) {
    super(message);
  }
}
