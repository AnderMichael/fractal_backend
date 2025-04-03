import { Product } from '@prisma/client';
import { ProductRepository } from '../repositories/productRepository';
import { ApiError } from '../utils/errorHandler';

export class ProductService {
    private repository: ProductRepository;

    constructor(repository = new ProductRepository()) {
        this.repository = repository;
    }

    async getAll(): Promise<Product[]> {
        return this.repository.findAll();
    }

    async getById(id: number): Promise<Product> {
        const product = await this.repository.findById(id);
        if (!product) throw new ApiError(`Product not founded`, 404);
        return product;
    }

    async create(data: { name: string; unitPrice: number }): Promise<Product> {
        return this.repository.create(data);
    }

    async update(id: number, data: { name?: string; unitPrice?: number }): Promise<Product> {
        const existing = await this.repository.findById(id);
        if (!existing) throw new ApiError(`Product not founded`, 404);
        return this.repository.update(id, data);
    }

    async delete(id: number): Promise<void> {
        const product = await this.repository.findById(id);
        if (!product) throw new ApiError(`Product not founded`, 404);
        return this.repository.delete(id);
    }
}