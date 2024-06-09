import { CatalogRepository } from "../../repository/catalog.repository"
import { MockCatalogRepository } from "../../repository/mockCatalog.repository";
import { CatalogService } from "../catalog.service";
import { faker } from '@faker-js/faker';
import { Factory } from 'rosie';

const productFactory = new Factory<ProductModel>()
        .attr('id', faker.number.int({ min: 1, max: 1000}))
        .attr('name', faker.commerce.productName)
        .attr('description', faker.commerce.productDescription)
        .attr('stock', faker.number.int({ min: 10, max: 100}))
        .attr('price', +faker.commerce.price({ min: 10, max: 100, dec: 2}))

const mockProduct = (input: any) => {
    return {
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        stock: faker.number.int({min: 10, max: 100}),
        price: +faker.commerce.price(),
        ...input
    }
}

describe('catalogService', () => {
    let repository: CatalogRepository;
    beforeEach(() => {
        repository = new MockCatalogRepository();
    });

    afterEach(() => {
        repository = {} as MockCatalogRepository;
    })

    describe('createProduct', () => {
        test('should create product',async () => {
            const service = new CatalogService(repository);
            const requestBody = mockProduct({
                id: faker.number.int({ min: 10, max: 100})
            });
            // const requestBody = {
            //     name: 'iPhone',
            //     description: 'Smart phone',
            //     stock: 1,
            //     price: 10
            // };
            const result = await service.createProduct(requestBody);
            expect(result).toMatchObject({
                id: expect.any(Number),
                name: expect.any(String),
                description: expect.any(String),
                price: expect.any(Number),
                stock: expect.any(Number),
            });
        })

        test('should throw an error with unable to create product', async () => {
            const service = new CatalogService(repository);
            const reqBody = mockProduct({
                id: faker.number.int({ min: 10, max: 100})
            });

            jest.spyOn(repository, 'create').mockImplementationOnce(() => Promise.resolve({} as ProductModel))
            await expect(service.createProduct(reqBody)).rejects.toThrow('unable to create product');
        });

        test('should throw an error with product already exist', async () => {
            const service = new CatalogService(repository);
            const reqBody = mockProduct({
                id: faker.number.int({ min: 10, max: 100})
            });

            jest.spyOn(repository, 'create').mockImplementationOnce(() => Promise.reject(new Error('product already exists')))
            await expect(service.createProduct(reqBody)).rejects.toThrow('product already exists');
        });
    })

    describe('updateProduct', () => {
        test('should update a product', async () => {
            const service = new CatalogService(repository);
            const reqBody = mockProduct({
                id: faker.number.int({ min: 10, max: 100})
            });

            const result = await service.updateProduct(reqBody);
            expect(result).toMatchObject(reqBody);
        })

        test('should throw an error with product does not exist', async () => {
            const service = new CatalogService(repository);

            jest.spyOn(repository, 'update').mockImplementationOnce(() => Promise.reject(new Error('product does not exists')))
            await expect(service.updateProduct({})).rejects.toThrow('product does not exists');
        });
    });

    describe('getProducts', () => {
        test('should get products by limit and offset', async () => {
            const service = new CatalogService(repository);
            const limit = faker.number.int({ min: 1, max: 50});
            const products = productFactory.buildList(limit);
            jest.spyOn(repository, 'find')
                .mockImplementationOnce(() => Promise.resolve(products))
            
            const results = await service.getProducts(limit, 0);

            expect(results.length).toEqual(limit);
            expect(results).toMatchObject(products);
        });

        test('should throw an error with no product found', async () => {
            const service = new CatalogService(repository);
            jest.spyOn(repository, 'find')
                .mockImplementationOnce(() => Promise.reject(new Error('no product found')))
            
                await expect(service.getProducts(0, 0)).rejects.toThrow('no product found');
        });
    });

    describe('getProduct', () => {
        test('should get product by id', async () => {
            const service = new CatalogService(repository);
            const product = productFactory.build();

            jest.spyOn(repository, 'findOne')
                .mockImplementationOnce(() => Promise.resolve(product));
            
            const result = await service.getProduct(product.id);
            expect(result).toMatchObject(product);
        })
    });

    describe('deleteProduct', () => {
        test('should delete product by id', async () => {
            const service = new CatalogService(repository);
            const product = productFactory.build();

            jest.spyOn(repository, 'delete')
                .mockImplementationOnce(() => Promise.resolve({ id: product.id }));
            
            const result = await service.deleteProduct(product.id);
            expect(result).toMatchObject({ id: product.id });
        });

        // test('should throw an error with product does not exist', async () => {
        //     const service = new CatalogService(repository);
        //     const product = productFactory.build();

        //     jest.spyOn(repository, 'delete').mockImplementationOnce(() => Promise.reject(new Error('product does not exists')));
        //     const result = await service.deleteProduct(product.id);
        //     expect(result).rejects.toThrow('product does not exists');
        // });
    });
})