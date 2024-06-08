export interface ICatalog {
    create(data: ProductModel): Promise<ProductModel>;
    update(data: ProductModel): Promise<ProductModel>;
    delete(id: number): void;
    find(): Promise<ProductModel[]>;
    findOne(id: number): Promise<ProductModel>;
}