import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DatabaseService extends PrismaClient {
  constructor() {
    super({
      datasources: {
        db: {
          //offline version
          // url: process.env.DATABASE_URL,
          //------------------------------
          //online version
          url: process.env.DATABASE_URL,
        },
      },
    });
  }
}
