import { CatalogRepository } from "./catalog.repository";

export class MockCatalogRepository implements CatalogRepository {
  create(data: ProductModel): Promise<ProductModel> {
    const mockProduct = {
      ...data,
    } as ProductModel;
    return Promise.resolve(mockProduct);
  }
  update(data: ProductModel): Promise<ProductModel> {
    return Promise.resolve(data as unknown as ProductModel);
  }
  delete(id: any) {
    return Promise.resolve(id);
  }
  find(limit: number, offset: number): Promise<ProductModel[]> {
    return Promise.resolve([]);
  }
  findOne(id: number): Promise<ProductModel> {
    return Promise.resolve({ id } as unknown as ProductModel);
  }
}