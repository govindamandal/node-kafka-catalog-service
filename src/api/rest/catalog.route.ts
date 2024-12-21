import { NextFunction, Request, Response, Router } from "express";

const catalogRouter = Router();

catalogRouter.post('/product',async (request: Request, response: Response, next: NextFunction) => {
    console.log('Creating product');
    return response.status(201).json({message: 'Product created'});
})

export default catalogRouter;