import { Router, Response } from 'express';
import { getQuoteFromLink } from '../repository/share';
import { CustomRequest } from '../types/custom-request';
import { methodNotAllowed } from '../utils/not-allowed';

export const share = Router();

share
  .route('/:shareId')
  .get((request: CustomRequest, response: Response) => {
    response.send({
      quote: getQuoteFromLink(request.params.shareId),
    });
  })
  .all(methodNotAllowed);
