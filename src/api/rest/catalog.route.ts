import { NextFunction, Request, Response, Router } from "express";

const catalogRouter = Router();

catalogRouter.post('/product',async (request: Request, response: Response, next: NextFunction) => {
    return response.status(201).json({});
})

export default catalogRouter;