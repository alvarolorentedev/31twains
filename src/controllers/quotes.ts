import { Router, Response } from 'express';
import { getQuotesForUser } from '../repository/quotes';
import { CustomRequest } from '../types/custom-request';

export const quotes = Router();

quotes.get('/', async (request: CustomRequest, response: Response) => {
  response.send({
    user: request.user,
    quotes: getQuotesForUser(request.user)
  });
});