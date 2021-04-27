import { Response } from 'express';
import {
  getUserFromToken,
  isTokenValid,
  updateTokenUsageCount,
} from '../repository/token';
import { AuthorizationInfo } from '../types/auth-info';
import { CustomRequest } from '../types/custom-request';

const BasicTokenAuth = (request: CustomRequest): AuthorizationInfo => {
  const base64Token = request.headers.authorization.replace('Basic ', '');
  const [user, password] = Buffer.from(base64Token, 'base64')
    .toString('utf-8')
    .split(':');
  if (user !== process.env.USERNAME && password !== process.env.PASSWORD)
    throw Error('Wrong Credentials');
  return { user };
};

const BearerTokenAuth = (request: CustomRequest): AuthorizationInfo => {
  const token = request.headers.authorization.replace('Bearer ', '');
  const user = getUserFromToken(token);
  if (user && !isTokenValid(token)) throw Error('Wrong Credentials');
  updateTokenUsageCount(token);
  return { user };
};

const authorizationRuleEngine = [
  {
    shouldApply: (request: CustomRequest): boolean =>
      request.path && request.path.startsWith('/share'),
    authorize: (): AuthorizationInfo => ({}),
  },
  {
    shouldApply: (request: CustomRequest): boolean =>
      request.path &&
      request.path === '/auth' &&
      request.headers.authorization &&
      request.headers.authorization.startsWith('Basic'),
    authorize: BasicTokenAuth,
  },
  {
    shouldApply: (request: CustomRequest): boolean =>
      request.headers.authorization &&
      request.headers.authorization.startsWith('Bearer'),
    authorize: BearerTokenAuth,
  },

  {
    shouldApply: (request: CustomRequest): boolean => true,
    authorize: (): AuthorizationInfo => {
      throw Error('Wrong Credentials');
    },
  },
];

export const authorization = (
  request: CustomRequest,
  response: Response,
  next: () => void
): void => {
  try {
    const { user } = authorizationRuleEngine
      .find((rule) => rule.shouldApply(request))
      .authorize(request);
    request.user = user;
    next();
  } catch (error) {
    response.status(401).send();
  }
};
