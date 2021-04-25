import * as data from '../../quotes.json';
import { quote } from '../types/quotes';

export const getQuotesForUser = (_: string): quote[] => {
  return data;
};
