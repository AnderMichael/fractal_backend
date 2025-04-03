import { Request, Response } from 'express';
import { ProductService } from '../services/productService';
import { successResponse } from '../utils/successHandler';

export class ProductController {
    private service: ProductService;

    constructor(service = new ProductService()) {
        this.service = service;
    }

    async getAll(req: Request, res: Response) {
        const products = await this.service.getAll();
        res.json(successResponse(products));
    };

    async getById(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const product = await this.service.getById(id);
        res.json(successResponse(product));
    };

    async create(req: Request, res: Response) {
        const product = await this.service.create(req.body);
        res.status(201).json(successResponse(product, 'Product Created'));
    };

    async update(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const product = await this.service.update(id, req.body);
        res.json(successResponse(product, 'Product Updated'));
    };

    async delete(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        await this.service.delete(id);
        res.status(204).send();
    };
}