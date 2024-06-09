export interface ICatalogInterface {
    create(data: ProductModel): Promise<ProductModel>;
    update(data: ProductModel): Promise<ProductModel>;
    delete(id: number): void;
    find(limit: number, offset: number): Promise<ProductModel[]>;
    findOne(id: number): Promise<ProductModel>;
}