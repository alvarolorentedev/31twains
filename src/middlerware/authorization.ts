import { Response } from 'express';
import { getUserFromToken, isTokenValid, updateTokenUsageCount } from '../repository/token';
import { CustomRequest } from '../types/custom-request';

export const authorization = (
  request: CustomRequest,
  response: Response,
  next: () => void
): void => {
  try {
    const authorizationHeader = request.headers.authorization
    if(request.path === '/auth' &&  authorizationHeader.startsWith('Basic')) {
      const base64Token = authorizationHeader.replace('Basic ', '');
      const [user, password] = Buffer.from(base64Token, 'base64')
        .toString('utf-8')
        .split(':');
      if (user !== process.env.USERNAME && password !== process.env.PASSWORD) {
        throw new Error('Invalid Credentials');
      }
      request.user = user;
    }
    else if(authorizationHeader.startsWith('Bearer')){
      const token = authorizationHeader.replace('Bearer ', '')
      const user = getUserFromToken(token)
      if(user && !isTokenValid(token))
        throw new Error('Expired Credentials');
      updateTokenUsageCount(token)
      request.user = user;
    }
    else 
      throw new Error('Invalid Credentials');
    next();
  } catch (error) {
    response.status(401).send();
  }
};
