import { ICatalogInterface } from "../interface/catalog.interface";

export class CatalogService {

    private _repository: ICatalogInterface;

    constructor(repository: ICatalogInterface) {
        this._repository = repository;
    }

    async createProduct(input: any) {
        const data = await this._repository.create(input);
        if (!data.id) {
            throw new Error('unable to create product')
        }
        return data;
    }
    async updateProduct(input: any) {
        const data = await this._repository.update(input);
        // emit event to update record in Elasticsearch

        return data;
    }

    // instead of this we get products from Elasticsearch
    async getProducts(limit: number, offset: number) {
        const products = await this._repository.find(limit, offset);
        // 
        return products;
    }

    async getProduct(id: number) {
        const product = await this._repository.findOne(id);
        return product;
    }

    async deleteProduct(id: number) {
        const result = await this._repository.delete(id);
        // delete from elastic search as well
        
        return result;
    }
}