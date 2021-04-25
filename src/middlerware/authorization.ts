import { Response } from "express";
import { CustomRequest } from "../types/custom-request";

export const authorization = (request: CustomRequest, response: Response, next: Function) => {
    try {
        const base64Token = request.headers.authorization.replace("Basic ", "")
        const [user, password] = Buffer.from(base64Token, 'base64').toString('utf-8').split(":")
        if (user !== process.env.USERNAME && password !== process.env.PASSWORD) {
            throw new Error("Invalid Credentials")
        }
        request.user = user
        next()
    } catch (error) {
        response.status(401).send()
    }
}