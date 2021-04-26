import { v4 as uuid } from 'uuid';

export const _ = {
  quotesLinksStore: {},
};

export const createLinkToQuote = (quote: string): string => {
  const linkId = uuid();
  _.quotesLinksStore[linkId] = quote;
  return linkId;
};

export const getQuoteFromLink = (linkId: string): string => {
  const quote = _.quotesLinksStore[linkId];
  if (!quote) throw new Error(' link does not exist');

  return quote;
};
