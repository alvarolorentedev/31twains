import { v4 as uuid } from 'uuid';

export const _ = {
  userStore: {},
};
const fiveMinutesInMillis = 300000;

export const generateTokenForUser = (user: string): string => {
  const token = uuid();
  _.userStore[token] = {
    user,
    count: 0,
    validUntil: new Date().getTime() + fiveMinutesInMillis,
  };
  return token;
};

export const getUserFromToken = (token: string): string => {
  return _.userStore[token].user;
};

export const updateTokenUsageCount = (token: string): void => {
  _.userStore[token].count += 1;
};
export const isTokenValid = (token: string): boolean => {
  const tokenValue = _.userStore[token];
  return tokenValue.count < 5 && tokenValue.validUntil > new Date().getTime();
};
