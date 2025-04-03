import { PrismaClient, Product } from '@prisma/client';

const prisma = new PrismaClient();

export class ProductRepository {
    async findAll(): Promise<Product[]> {
        return prisma.product.findMany();
    }

    async findById(id: number): Promise<Product | null> {
        return prisma.product.findUnique({
            where: { id },
        });
    }

    async create(data: { name: string; unitPrice: number }): Promise<Product> {
        return prisma.product.create({
            data,
        });
    }

    async update(id: number, data: { name?: string; unitPrice?: number }): Promise<Product> {
        return prisma.product.update({
            where: { id },
            data,
        });
    }

    async delete(id: number): Promise<void> {
        await prisma.product.delete({
            where: { id },
        });
    }
}