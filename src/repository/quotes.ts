import * as data from '../../quotes.json';
import { quote } from '../types/quotes';

export const getQuotesForUser = (_: string): quote[] => data as quote[];

export const getQuoteForUserById = (_: string, id: string): quote =>{
  const quote = (data as quote[]).find((quote) => quote.id === id);
  if(!quote)
    throw new Error("Unable to find quote with id");
  return quote;
}
  
