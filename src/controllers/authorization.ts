import { Router, Response } from 'express';
import { generateTokenForUser } from '../repository/token';
import { CustomRequest } from '../types/custom-request';
import { methodNotAllowed } from '../utils/not-allowed';

export const authorization = Router();

authorization
  .route('/')
  .get((request: CustomRequest, response: Response) => {
    response.send({
      token: generateTokenForUser(request.user),
    });
  })
  .all(methodNotAllowed);
