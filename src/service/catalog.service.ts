import { ICatalogInterface } from "../interface/catalog.interface";

export class CatalogService {

    private _repository: ICatalogInterface;

    constructor(repository: ICatalogInterface) {
        this._repository = repository;
    }

    async createProduct(input: any) {
        const data = this._repository.create(input);
        return data;
    }
    updateProduct(input: any) {

    }

    getProducts(limit: number, offset: number) {

    }

    getProduct(id: number) {

    }

    deleteProduct(id: number) {

    }
}