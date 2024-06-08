import { ICatalogInterface } from "../interface/catalog.interface";

export class CatalogService {

    private _repository: ICatalogInterface;

    constructor(repository: ICatalogInterface) {
        this._repository = repository;
    }

    createProduct(input: any) {

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