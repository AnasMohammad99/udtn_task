import { Injectable } from '@nestjs/common';
import { DatabaseService } from './database/database.service';
import { handleError } from './exceptions/errors-handler';
import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';

@Injectable()
export class AppService {
  constructor(private database: DatabaseService) {}
  getHello(): string {
    return 'Hello World!';
  }
  async addDummyData() {
    // try {
    //   const fakerRounds = 10;
    //   dotenv.config();
    //   console.log('Seeding...');
    //   //---------- Users ---------------
    //   const fUser = await this.database.user.create({
    //     data: {
    //       username: faker.internet.userName(),
    //       role: 'USER',
    //       password: await bcrypt.hash('Ab#123456', 10),
    //     },
    //   });
    //   for (let i = +fUser.id; i < +fUser.id + fakerRounds - 1; i++) {
    //     await this.database.user.create({
    //       data: {
    //         username: faker.internet.userName(),
    //         role: 'USER',
    //         password: await bcrypt.hash('Ab#123456', 10),
    //       },
    //     });
    //   }
    //   for (let i = +fUser.id; i < +fUser.id + fakerRounds; i++) {
    //     await this.database.user.create({
    //       data: {
    //         username: faker.internet.userName(),
    //         role: 'OPERATOR',
    //         password: await bcrypt.hash('Ab#123456', 10),
    //       },
    //     });
    //   }
    //   //----------branches---------------
    //   for (let i = +fUser.id; i < +fUser.id + fakerRounds; i++) {
    //     await this.database.branch.create({
    //       data: {
    //         user_id: faker.number.int({
    //           min: +fUser.id,
    //           max: +fUser.id + fakerRounds - 1,
    //         }),
    //         branchname: faker.company.name(),
    //         phone_number: faker.string.numeric(9),
    //         address: faker.location.city(),
    //         // delivery_time: faker.date.between({
    //         //   from: '2024-01-01T00:00:00.000Z',
    //         //   to: '2025-01-01T00:00:00.000Z',
    //         // }),
    //       },
    //     });
    //   }
    //   //-----------suppliers-------------
    //   for (let i = +fUser.id; i < +fUser.id + fakerRounds; i++) {
    //     await this.database.supplier.create({
    //       data: {
    //         suppliername: faker.internet.userName(),
    //         phone_number: faker.string.numeric(9),
    //         account_number: faker.number.int({ min: 1, max: 100 }),
    //         address: faker.location.state(),
    //         email: faker.internet.email(),
    //         supplier_type: faker.helpers.arrayElement(['FARMER', 'CORPORATE']),
    //       },
    //     });
    //   }
    //   //-------------customers-----------
    //   for (let i = +fUser.id; i < +fUser.id + fakerRounds; i++) {
    //     await this.database.customer.create({
    //       data: {
    //         customername: faker.internet.userName(),
    //         email: faker.internet.email(),
    //         phone_number: faker.string.numeric(9),
    //         delivery_location: faker.location.state(),
    //         customer_category: faker.helpers.arrayElement([
    //           'SCHOOL',
    //           'INDIVIDUAL',
    //           'CORPORATE',
    //         ]),
    //       },
    //     });
    //   }
    //   //------------products-------------
    //   await this.database.product.createMany({
    //     data: [
    //       {
    //         supplier_id: Math.ceil(+fUser.id / 2) + 2,
    //         productname: 'apple',
    //         product_code: '1',
    //         price_per_case: 74.95,
    //         price_per_case_3_percent: 72.7015,
    //         price_per_case_bulk: 82.44500000000001,
    //         price_per_item: 0.90876875,
    //         price_actual_cost: 0.727015,
    //         pieces_per_case: 100,
    //         price_bulk_buying_per_case: 100,
    //         price_bulk_buying_per_half_case: 50,
    //         price_community_market: 80,
    //         price_good_food_box: 78,
    //         stock_quantity: 100,
    //         weight_kg: 18,
    //         weight_lb: 39.6,
    //         sku_id: 1,
    //         enable: true,
    //         product_type: 'INDIVIDUAL',
    //         acutual_cost: 'EACH',
    //       },
    //       {
    //         supplier_id: Math.ceil(+fUser.id / 2) + 2,
    //         productname: 'mango',
    //         product_code: '12',
    //         price_per_case: 74.95,
    //         price_per_case_3_percent: 72.7015,
    //         price_per_case_bulk: 82.44500000000001,
    //         price_per_item: 0.90876875,
    //         price_actual_cost: 0.727015,
    //         pieces_per_case: 100,
    //         price_bulk_buying_per_case: 100,
    //         price_bulk_buying_per_half_case: 50,
    //         price_community_market: 80,
    //         price_good_food_box: 78,
    //         stock_quantity: 100,
    //         weight_kg: 18,
    //         weight_lb: 39.6,
    //         sku_id: 1,
    //         enable: true,
    //         product_type: 'INDIVIDUAL',
    //         acutual_cost: 'EACH',
    //       },
    //       {
    //         supplier_id: Math.ceil(+fUser.id / 2) + 2,
    //         productname: 'bananas',
    //         product_code: '13',
    //         price_per_case: 28.95,
    //         price_per_case_3_percent: 28.0815,
    //         price_per_case_bulk: 31.845,
    //         price_per_item: 0.3694934210526316,
    //         price_actual_cost: 0.2955947368421052,
    //         price_bulk_buying_per_case: 100,
    //         price_bulk_buying_per_half_case: 50,
    //         price_community_market: 80,
    //         price_good_food_box: 78,
    //         pieces_per_case: 95,
    //         stock_quantity: 100,
    //         weight_kg: 18,
    //         weight_lb: 39.6,
    //         sku_id: 1,
    //         enable: true,
    //         product_type: 'INDIVIDUAL',
    //         acutual_cost: 'EACH',
    //       },
    //       {
    //         supplier_id: Math.ceil(+fUser.id / 2) + 2,
    //         productname: 'blackberries',
    //         product_code: '14',
    //         price_per_case: 42.95,
    //         price_per_case_3_percent: 41.6615,
    //         price_per_case_bulk: 47.245,
    //         price_per_item: 4.339739583333333,
    //         price_actual_cost: 3.471791666666667,
    //         price_bulk_buying_per_case: 100,
    //         price_bulk_buying_per_half_case: 50,
    //         price_community_market: 80,
    //         price_good_food_box: 78,
    //         pieces_per_case: 12,
    //         stock_quantity: 100,
    //         weight_kg: 3.2,
    //         weight_lb: 7.040000000000001,
    //         sku_id: 1,
    //         enable: true,
    //         product_type: 'INDIVIDUAL',
    //         acutual_cost: 'EACH',
    //       },
    //       {
    //         supplier_id: Math.ceil(+fUser.id / 2) + 2,
    //         productname: 'blueberries',
    //         product_code: '15',
    //         price_per_case: 54.95,
    //         price_per_case_3_percent: 53.3015,
    //         price_per_case_bulk: 60.44500000000001,
    //         price_per_item: 5.552239583333335,
    //         price_actual_cost: 4.441791666666667,
    //         price_bulk_buying_per_case: 100,
    //         price_bulk_buying_per_half_case: 50,
    //         price_community_market: 80,
    //         price_good_food_box: 78,
    //         pieces_per_case: 12,
    //         stock_quantity: 100,
    //         weight_kg: 3.2,
    //         weight_lb: 7.040000000000001,
    //         sku_id: 1,
    //         enable: true,
    //         product_type: 'INDIVIDUAL',
    //         acutual_cost: 'EACH',
    //       },
    //     ],
    //   });
    //   //------------cehp box-------------
    //   await this.database.chepBox.create({
    //     data: {
    //       chepBoxname: 'Box 1',
    //       chepBox_price: 8.936193070175438,
    //       supplier_id: Math.ceil(+fUser.id / 2) + 2,
    //       products: {
    //         createMany: {
    //           data: [
    //             {
    //               supplier_id: Math.ceil(+fUser.id / 2) + 2,
    //               productname: 'apple',
    //               product_code: '16',
    //               price_per_case: 74.95,
    //               price_per_case_3_percent: 72.7015,
    //               price_per_case_bulk: 82.44500000000001,
    //               price_per_item: 0.90876875,
    //               price_actual_cost: 0.727015,
    //               price_bulk_buying_per_case: 100,
    //               price_bulk_buying_per_half_case: 50,
    //               price_community_market: 80,
    //               price_good_food_box: 78,
    //               pieces_per_case: 100,
    //               stock_quantity: 100,
    //               weight_kg: 18,
    //               weight_lb: 39.6,
    //               sku_id: 1,
    //               enable: true,
    //               product_type: 'CHEP_BOX',
    //               acutual_cost: 'EACH',
    //             },
    //             {
    //               supplier_id: Math.ceil(+fUser.id / 2) + 2,
    //               productname: 'bananas',
    //               product_code: '17',
    //               price_per_case: 28.95,
    //               price_per_case_3_percent: 28.0815,
    //               price_per_case_bulk: 31.845,
    //               price_per_item: 0.3694934210526316,
    //               price_actual_cost: 0.2955947368421052,
    //               price_bulk_buying_per_case: 100,
    //               price_bulk_buying_per_half_case: 50,
    //               price_community_market: 80,
    //               price_good_food_box: 78,
    //               pieces_per_case: 95,
    //               stock_quantity: 100,
    //               weight_kg: 18,
    //               weight_lb: 39.6,
    //               sku_id: 1,
    //               enable: true,
    //               product_type: 'CHEP_BOX',
    //               acutual_cost: 'EACH',
    //             },
    //             {
    //               supplier_id: Math.ceil(+fUser.id / 2) + 2,
    //               productname: 'blackberries',
    //               product_code: '18',
    //               price_per_case: 42.95,
    //               price_per_case_3_percent: 41.6615,
    //               price_per_case_bulk: 47.245,
    //               price_per_item: 4.339739583333333,
    //               price_actual_cost: 3.471791666666667,
    //               price_bulk_buying_per_case: 100,
    //               price_bulk_buying_per_half_case: 50,
    //               price_community_market: 80,
    //               price_good_food_box: 78,
    //               pieces_per_case: 12,
    //               stock_quantity: 100,
    //               weight_kg: 3.2,
    //               weight_lb: 7.040000000000001,
    //               sku_id: 1,
    //               enable: true,
    //               product_type: 'CHEP_BOX',
    //               acutual_cost: 'EACH',
    //             },
    //             {
    //               supplier_id: Math.ceil(+fUser.id / 2) + 2,
    //               productname: 'blueberries',
    //               product_code: '19',
    //               price_per_case: 54.95,
    //               price_per_case_3_percent: 53.3015,
    //               price_per_case_bulk: 60.44500000000001,
    //               price_per_item: 5.552239583333335,
    //               price_actual_cost: 4.441791666666667,
    //               price_bulk_buying_per_case: 100,
    //               price_bulk_buying_per_half_case: 50,
    //               price_community_market: 80,
    //               price_good_food_box: 78,
    //               pieces_per_case: 12,
    //               stock_quantity: 100,
    //               weight_kg: 3.2,
    //               weight_lb: 7.040000000000001,
    //               sku_id: 1,
    //               enable: true,
    //               product_type: 'CHEP_BOX',
    //               acutual_cost: 'EACH',
    //             },
    //             {
    //               supplier_id: Math.ceil(+fUser.id / 2) + 2,
    //               productname: 'mango',
    //               product_code: '20',
    //               price_per_case: 74.95,
    //               price_per_case_3_percent: 72.7015,
    //               price_per_case_bulk: 82.44500000000001,
    //               price_per_item: 0.90876875,
    //               price_actual_cost: 0.727015,
    //               price_bulk_buying_per_case: 100,
    //               price_bulk_buying_per_half_case: 50,
    //               price_community_market: 80,
    //               price_good_food_box: 78,
    //               pieces_per_case: 100,
    //               stock_quantity: 100,
    //               weight_kg: 18,
    //               weight_lb: 39.6,
    //               sku_id: 1,
    //               enable: true,
    //               product_type: 'CHEP_BOX',
    //               acutual_cost: 'EACH',
    //             },
    //           ],
    //         },
    //       },
    //     },
    //   });
    //   //------------orders---------------
    //   for (let i = +fUser.id; i < +fUser.id + fakerRounds; i++) {
    //     await this.database.order.create({
    //       data: {
    //         customer_id: faker.number.int({
    //           min: Math.ceil(+fUser.id / 2),
    //           max: Math.ceil(+fUser.id / 2) + fakerRounds - 1,
    //         }),
    //         branch_id: faker.number.int({
    //           min: Math.ceil(+fUser.id / 2),
    //           max: Math.ceil(+fUser.id / 2) + fakerRounds - 1,
    //         }),
    //         total_price: faker.number.int({ max: 100000 }),
    //         payment_method: faker.helpers.arrayElement(['CASH', 'DEBIT']),
    //         order_status: faker.helpers.arrayElement([
    //           'PENDING',
    //           'SHIPPED',
    //           'CANCELED',
    //           'DELIVERED',
    //         ]),
    //         order_items: {
    //           createMany: {
    //             data: [
    //               {
    //                 product_id: faker.number.int({
    //                   min: Math.ceil(+fUser.id / 2),
    //                   max: Math.ceil(+fUser.id / 2) + 4,
    //                 }),
    //                 total_price: faker.number.float({
    //                   max: 1000,
    //                   min: 50,
    //                 }),
    //                 total_weight: faker.number.float({ max: 100, min: 10 }),
    //                 quantity: faker.number.int({ max: 100, min: 1 }),
    //               },
    //               {
    //                 product_id: faker.number.int({
    //                   min: Math.ceil(+fUser.id / 2),
    //                   max: Math.ceil(+fUser.id / 2) + 4,
    //                 }),
    //                 total_price: faker.number.float({
    //                   max: 1000,
    //                   min: 50,
    //                 }),
    //                 total_weight: faker.number.float({ max: 100, min: 10 }),
    //                 quantity: faker.number.int({ max: 100, min: 1 }),
    //               },
    //               {
    //                 product_id: faker.number.int({
    //                   min: Math.ceil(+fUser.id / 2),
    //                   max: Math.ceil(+fUser.id / 2) + 4,
    //                 }),
    //                 total_price: faker.number.float({
    //                   max: 1000,
    //                   min: 50,
    //                 }),
    //                 total_weight: faker.number.float({ max: 100, min: 10 }),
    //                 quantity: faker.number.int({ max: 100, min: 1 }),
    //               },
    //               {
    //                 product_id: faker.number.int({
    //                   min: Math.ceil(+fUser.id / 2),
    //                   max: Math.ceil(+fUser.id / 2) + 4,
    //                 }),
    //                 total_price: faker.number.float({
    //                   max: 1000,
    //                   min: 50,
    //                 }),
    //                 total_weight: faker.number.float({ max: 100, min: 10 }),
    //                 quantity: faker.number.int({ max: 100, min: 1 }),
    //               },
    //               {
    //                 product_id: faker.number.int({
    //                   min: Math.ceil(+fUser.id / 2),
    //                   max: Math.ceil(+fUser.id / 2) + 4,
    //                 }),
    //                 total_price: faker.number.float({
    //                   max: 1000,
    //                   min: 50,
    //                 }),
    //                 total_weight: faker.number.float({ max: 100, min: 10 }),
    //                 quantity: faker.number.int({ max: 100, min: 1 }),
    //               },
    //             ],
    //           },
    //         },
    //       },
    //     });
    //   }
    //   return { message: 'dummy data added' };
    // } catch (error) {
    //   handleError(error);
    // }
  }
  async deleteAllData() {
    try {
      await this.database.product.deleteMany({});
      await this.database.token.deleteMany({});
      await this.database.user.deleteMany({});
      return { message: 'all data deleted' };
    } catch (error) {
      handleError(error);
    }
  }
}
