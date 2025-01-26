import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/jwtAuthGuard';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { RoleGuard } from 'src/roleAuthGuard';
@UseGuards(JwtAuthGuard, RoleGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  //get all users
  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }
  //add user
  @Post()
  addUser(@Body() dto: CreateUserDto, @Req() req) {
    return this.userService.addUser(dto, req);
  }
  //get user by id
  @Get('/:user_id')
  getUserById(@Param('user_id') user_id: string) {
    return this.userService.getUserById(+user_id);
  }
  //update user by id
  @Patch('/:user_id')
  updateUser(@Body() dto: UpdateUserDto, @Param('user_id') user_id: string) {
    return this.userService.updateUser(dto, +user_id);
  }
  //delete user by id
  @Delete('/:user_id')
  deleteUserById(@Param('user_id') user_id: string) {
    return this.userService.deleteUserById(+user_id);
  }
}
