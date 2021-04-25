import { Router, Response } from "express";
import { generateTokenForUser } from "../repository/token";
import { CustomRequest } from "../types/custom-request";

export const authorization = Router()

authorization.get('/', async (request: CustomRequest, response: Response) => {
    response.send({
        token: generateTokenForUser(request.user)
    })
})

