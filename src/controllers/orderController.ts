import { Request, Response } from 'express';
import { OrderService } from '../services/orderService';
import { successResponse } from '../utils/successHandler';

export class OrderController {
    private service: OrderService;

    constructor() {
        this.service = new OrderService();
    }

    async getAll(req: Request, res: Response) {
        const data = await this.service.getAll();
        res.json(successResponse(data));
    };

    async getById(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const data = await this.service.getById(id);
        res.json(successResponse(data));
    };

    async create(req: Request, res: Response) {
        const order = await this.service.create(req.body);
        res.status(201).json(successResponse(order, 'Order Created'));
    };

    async update(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const order = await this.service.update(id, req.body);
        res.json(successResponse(order, 'Order Updated'));
    };

    async delete(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        await this.service.delete(id);
        res.status(204).send();
    };
}