import { Injectable } from '@nestjs/common';
import { DatabaseService } from './database/database.service';
import { handleError } from './exceptions/errors-handler';
import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';

@Injectable()
export class AppService {
  constructor(private database: DatabaseService) { }
  getHello(): string {
    return 'Hello World!';
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
