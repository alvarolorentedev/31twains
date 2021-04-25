import { getQuotesForUser } from "../../src/repository/quotes";
import * as data from "../../quotes.json";
describe('quotes repository should', () => {
    describe('getQuotesForUser should', () => {
        test('return quotes for user', () => {
            expect(getQuotesForUser("")).toEqual(data)
        });
    });
});