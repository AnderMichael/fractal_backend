import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const products = await prisma.product.createMany({
    data: [
      { name: 'Café', unitPrice: 15.5 },
      { name: 'Té Verde', unitPrice: 10.0 },
      { name: 'Pan Dulce', unitPrice: 8.75 },
    ],
    skipDuplicates: true, 
  });

  const allProducts = await prisma.product.findMany();

  // 2. Órdenes con productos
  await prisma.order.create({
    data: {
      orderNumber: 1001,
      totalPrice: 54.75,
      orderItems: {
        create: [
          {
            productId: allProducts[0].id,
            quantity: 2,
            subtotal: allProducts[0].unitPrice * 2,
          },
          {
            productId: allProducts[2].id,
            quantity: 2,
            subtotal: allProducts[2].unitPrice * 2,
          },
          {
            productId: allProducts[1].id,
            quantity: 1,
            subtotal: allProducts[1].unitPrice,
          },
        ],
      },
    },
  });

  await prisma.order.create({
    data: {
      orderNumber: 1002,
      totalPrice: 25.5,
      orderItems: {
        create: [
          {
            productId: allProducts[1].id,
            quantity: 2,
            subtotal: allProducts[1].unitPrice * 2,
          },
          {
            productId: allProducts[2].id,
            quantity: 1,
            subtotal: allProducts[2].unitPrice,
          },
        ],
      },
    },
  });

  console.log('Seed Completed.');
}

main()
  .catch((e) => {
    console.error('Error during execution:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
