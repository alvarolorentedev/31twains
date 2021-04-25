import { Application } from "express";
import { authorization } from "../routes/authorization";

export const routesMiddleware = (app: Application) => {
    app.use('/auth', authorization)
}