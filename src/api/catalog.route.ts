import { NextFunction, Request, Response, Router } from 'express';
import { CatalogService } from '../service/catalog.service';
import { CatalogRepository } from '../repository/catalog.repository';

const catalogRouter = Router();
export const catalogService = new CatalogService(new CatalogRepository());
catalogRouter.post(
  '/products',
  async (request: Request, response: Response, next: NextFunction) => {
    const result = await catalogService.createProduct(request.body);
    return response.status(201).json(result);
  }
);

export default catalogRouter;
