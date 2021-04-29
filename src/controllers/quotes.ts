import { Router, Response } from 'express';
import { getQuoteForUserById, getQuotesForUser } from '../repository/quotes';
import { createLinkToQuote } from '../repository/share';
import { CustomRequest } from '../types/custom-request';
import { methodNotAllowed } from '../utils/not-allowed';

export const quotes = Router();

quotes
  .route('/')
  .get((request: CustomRequest, response: Response) => {
    response.send({
      user: request.user,
      quotes: getQuotesForUser(request.user),
    });
  })
  .all(methodNotAllowed);

quotes
  .route('/:quoteId')
  .get((request: CustomRequest, response: Response) => {
    response.send(getQuoteForUserById(request.user, request.params.quoteId));
  })
  .all(methodNotAllowed);

quotes
  .route('/:quoteId/share')
  .get((request: CustomRequest, response: Response) => {
    const quote = getQuoteForUserById(request.user, request.params.quoteId);
    const shareId = createLinkToQuote(quote.quote);
    response.send({
      share_url: `/share/${shareId}`,
    });
  })
  .all(methodNotAllowed);
