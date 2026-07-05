import { NextFunction, Request, Response, Router } from 'express';
import { CatalogService } from '../service/catalog.service';
import { CatalogRepository } from '../repository/catalog.repository';
import { RequestValidator } from '../utils/requestValidator';
import { CreateProductDto } from '../dto/product.dto';

const catalogRouter = Router();
export const catalogService = new CatalogService(new CatalogRepository());
catalogRouter.post(
  '/products',
  async (request: Request, response: Response, next: NextFunction) => {
    const { errors, input } = await RequestValidator(
        CreateProductDto,
        request.body
    );

    if (errors) {
      return response.status(400).json(errors);
    }
    
    try {
      const result = await catalogService.createProduct(input);
      return response.status(201).json(result);
    } catch (error) {
      return response.status(500).json({ error: 'Error occurred on product creation' });
    }
  }
);

export default catalogRouter;
