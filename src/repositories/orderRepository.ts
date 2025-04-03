import { Order, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class OrderRepository {
  async findAll(): Promise<Order[]> {
    return prisma.order.findMany({
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
      },
    });
  }

  async findById(id: number): Promise<Order | null> {
    return prisma.order.findUnique({
      where: { id },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
      },
    });
  }

  async create(data: {
    orderNumber: number;
    orderItems: { productId: number; quantity: number; subtotal: number }[];
    totalPrice: number;
  }): Promise<Order> {
    return prisma.order.create({
      data: {
        orderNumber: data.orderNumber,
        totalPrice: data.totalPrice,
        orderItems: {
          create: data.orderItems.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            subtotal: item.subtotal,
          })),
        },
      },
      include: {
        orderItems: true,
      },
    });
  }

  async update(id: number, data: {
    orderNumber?: number;
    totalPrice?: number;
    orderItems?: { productId: number; quantity: number; subtotal: number }[];
  }): Promise<Order> {
    return prisma.order.update({
      where: { id },
      data: {
        orderNumber: data.orderNumber,
        totalPrice: data.totalPrice,
        ...(data.orderItems && {
          orderItems: {
            deleteMany: {},
            create: data.orderItems.map(item => ({
              productId: item.productId,
              quantity: item.quantity,
              subtotal: item.subtotal,
            })),
          },
        }),
      },
      include: {
        orderItems: true,
      },
    });
  }

  async delete(id: number): Promise<void> {
    await prisma.orderProduct.deleteMany({ where: { orderId: id } });
    await prisma.order.delete({ where: { id } });
  }
}
