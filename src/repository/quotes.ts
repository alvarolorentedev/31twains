import * as data from '../../quotes.json';
import { NotFoundError } from '../types/errors';
import { quote } from '../types/quotes';
export const _ = {
  userQuotesStore: {
    [process.env.USERNAME]: data,
  },
};
export const getQuotesForUser = (user: string): quote[] => {
  const quotes = _.userQuotesStore[user];
  if (!quotes) throw new NotFoundError('No quotes for request user');
  return quotes;
};

export const getQuoteForUserById = (user: string, id: string): quote => {
  const quote = getQuotesForUser(user).find((quote) => quote.id === id);
  if (!quote) throw new NotFoundError('Unable to find quote with id');
  return quote;
};
