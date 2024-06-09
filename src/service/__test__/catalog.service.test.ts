import { CatalogRepository } from "../../repository/catalog.repository"
import { MockCatalogRepository } from "../../repository/mockCatalog.repository";
import { CatalogService } from "../catalog.service";
import { faker } from '@faker-js/faker'

const mockProduct = () => {
    return {
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        stock: faker.number.int({min: 10, max: 100}),
        price: +faker.commerce.price()
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
            const requestBody = mockProduct();
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
    })
})