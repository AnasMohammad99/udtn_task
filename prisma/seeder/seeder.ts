// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';

const prisma = new PrismaClient();

async function main() {
  const fakerRounds = 10;
  dotenv.config();
  console.log('Seeding...');
  //---------- Users ---------------
  for (let i = 0; i < fakerRounds; i++) {
    await prisma.user.create({
      data: {
        username: faker.internet.userName(),
        role: faker.helpers.arrayElement(['USER', 'MODERATOR']),
        password: await bcrypt.hash('Ab#123456', 10),
        email: faker.internet.email(),
      },
    });
  }

  //------------products-----------
  await prisma.product.createMany({
    data: [
      {
        product_name: 'Product 1',
        price: 88.95,
        product_description: 'description 1',
        stock_quantity: 50,
      },
      {
        product_name: 'Product 2',
        price: 16.46,
        product_description: 'description 2',
        stock_quantity: 39,
      },
      {
        product_name: 'Product 3',
        price: 35.19,
        product_description: 'description 3',
        stock_quantity: 28,
      },
      {
        product_name: 'Product 4',
        price: 99.0,
        product_description: 'description 4',
        stock_quantity: 67,
      },
      {
        product_name: 'Product 5',
        price: 74.95,
        product_description: 'description 5',
        stock_quantity: 73,
      },
      {
        product_name: 'Product 6',
        price: 64.23,
        product_description: 'description 6',
        stock_quantity: 13,
      },
      {
        product_name: 'Product 7',
        price: 14.23,
        product_description: 'description 6',
        stock_quantity: 0,
      },
    ],
  });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
