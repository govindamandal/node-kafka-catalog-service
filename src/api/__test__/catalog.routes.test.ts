/// <reference types="jest" />
import request from 'supertest';
import express from 'express';
import { faker } from '@faker-js/faker';
import catalogRouter, { catalogService } from '../catalog.route';
import { ProductFactory } from '../../utils/fixtures';

const app = express();
app.use(express.json());
app.use(catalogRouter);

const mockRequest = () => {
  return {
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    stock: faker.number.int({ min: 10, max: 100 }),
    price: +faker.commerce.price(),
  };
};

describe('catalogRouter', () => {
  describe('POST /products', () => {
    test('Should create product successfully', async () => {
      const requestBody = mockRequest();
      const product = ProductFactory.build();

      jest.spyOn(catalogService, 'createProduct').mockImplementationOnce(() => Promise.resolve(product));

      const response = await request(app)
        .post('/products')
        .send(requestBody)
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json');

      expect(response.status).toBe(201);
    //   expect(response.body).toEqual({ message: 'Product created!' });
    });
  });
});
