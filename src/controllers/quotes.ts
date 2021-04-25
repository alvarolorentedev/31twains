import { Router, Response } from 'express';
import { getQuoteForUserById, getQuotesForUser } from '../repository/quotes';
import { CustomRequest } from '../types/custom-request';
import { methodNotAllowed } from '../utils/not-allowed';

export const quotes = Router();

quotes
  .route('/')
  .get(async (request: CustomRequest, response: Response) => {
    response.send({
      user: request.user,
      quotes: getQuotesForUser(request.user),
    });
  })
  .all(methodNotAllowed);

quotes
  .route('/:quoteId')
  .get(async (request: CustomRequest, response: Response) => {
    response.send(getQuoteForUserById(request.user, request.params.quoteId));
  })
  .all(methodNotAllowed);
