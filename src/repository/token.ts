import { v4 as uuid } from "uuid";

const tokenStore = {

}

export const generateTokenForUser = (user: string) => {
    tokenStore[user]={
        token: uuid(),
        count: 1,
        createdOn: new Date().getTime()
    }
    return tokenStore[user].token
};
