import { Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './jwtAuthGuard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @UseGuards(JwtAuthGuard)
  @Post('/add-data')
  addDummyData() {
    return this.appService.addDummyData();
  }
  @UseGuards(JwtAuthGuard)
  @Delete('delete-data')
  deleteAllData() {
    return this.appService.deleteAllData();
  }
}
