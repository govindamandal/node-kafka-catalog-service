import { ICatalogInterface } from "../interface/catalog.interface";

export class CatalogRepository implements ICatalogInterface {
    create(data: ProductModel): Promise<ProductModel> {
        throw new Error("Method not implemented.");
    }
    update(data: ProductModel): Promise<ProductModel> {
        throw new Error("Method not implemented.");
    }
    delete(id: number): void {
        throw new Error("Method not implemented.");
    }
    find(limit: number, offset: number): Promise<ProductModel[]> {
        
        throw new Error("Method not implemented.");
    }
    findOne(id: number): Promise<ProductModel> {
        throw new Error("Method not implemented.");
    }
}