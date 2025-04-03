import { Order } from '@prisma/client';
import { OrderRepository } from '../repositories/orderRepository';
import { ApiError } from '../utils/errorHandler';

export class OrderService {
  private repository: OrderRepository;

  constructor() {
    this.repository = new OrderRepository();
  }

  async getAll(): Promise<Order[]> {
    return this.repository.findAll();
  }

  async getById(id: number): Promise<Order> {
    const order = await this.repository.findById(id);
    if (!order) throw new ApiError(`Orden con ID ${id} no encontrada`, 404);
    return order;
  }

  async create(data: {
    orderNumber: number;
    totalPrice: number;
    orderItems: { productId: number; quantity: number; subtotal: number }[];
  }): Promise<Order> {
    return this.repository.create(data);
  }

  async update(id: number, data: {
    orderNumber?: number;
    totalPrice?: number;
    orderItems?: { productId: number; quantity: number; subtotal: number }[];
  }): Promise<Order> {
    const exists = await this.repository.findById(id);
    if (!exists) throw new ApiError('Order not founded', 404);

    return this.repository.update(id, data);
  }

  async delete(id: number): Promise<void> {
    const exists = await this.repository.findById(id);
    if (!exists) throw new ApiError('Order not founded', 404);

    await this.repository.delete(id);
  }
}
