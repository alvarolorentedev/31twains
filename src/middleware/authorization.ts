import { Response } from 'express';
import {
  getUserFromToken,
  isTokenValid,
  updateTokenUsageCount,
} from '../repository/token';
import { CustomRequest } from '../types/custom-request';

const authorizationRuleEngine = [
  {
    shouldApply: (request: CustomRequest): boolean =>
      request.path && request.path.startsWith('/share'),
    authorize: (): boolean => true,
  },
  {
    shouldApply: (request: CustomRequest): boolean =>
      request.path &&
      request.path === '/auth' &&
      request.headers.authorization &&
      request.headers.authorization.startsWith('Basic'),
    authorize: (request: CustomRequest): boolean => {
      const base64Token = request.headers.authorization.replace('Basic ', '');
      const [user, password] = Buffer.from(base64Token, 'base64')
        .toString('utf-8')
        .split(':');
      if (user !== process.env.USERNAME && password !== process.env.PASSWORD) {
        return false;
      }
      request.user = user;
      return true;
    },
  },
  {
    shouldApply: (request: CustomRequest): boolean =>
      request.headers.authorization &&
      request.headers.authorization.startsWith('Bearer'),
    authorize: (request: CustomRequest): boolean => {
      try {
        const token = request.headers.authorization.replace('Bearer ', '');
        const user = getUserFromToken(token);
        if (user && !isTokenValid(token)) return false;
        updateTokenUsageCount(token);
        request.user = user;
        return true;
      } catch (error) {
        return false;
      }
    },
  },

  {
    shouldApply: (request: CustomRequest): boolean => true,
    authorize: (request: CustomRequest): boolean => false,
  },
];

export const authorization = (
  request: CustomRequest,
  response: Response,
  next: () => void
): void => {
  const isAuthorized = authorizationRuleEngine
    .find((rule) => rule.shouldApply(request))
    .authorize(request);
  if (isAuthorized) next();
  else response.status(401).send();
};
