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
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiForbiddenResponse, ApiOperation, ApiParam, ApiResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { CreateUDto } from 'src/auth/dtos/auth.dto';
@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) { }
  //get all users
  @UseGuards(RoleGuard)
  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Retrieved all users successfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  getAllUsers() {
    return this.userService.getAllUsers();
  }
  //add user
  @UseGuards(RoleGuard)
  @Post()
  @ApiOperation({ summary: 'Add a new user' })
  @ApiBearerAuth()
  @ApiBody({ type: CreateUDto })
  @ApiResponse({ status: 201, description: 'User added successfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'User already exists' })
  addUser(@Body() dto: CreateUserDto, @Req() req) {
    return this.userService.addUser(dto, req);
  }
  //get user by id
  @Get('/:user_id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiBearerAuth()
  @ApiParam({ name: 'user_id', description: 'ID of the user' })
  @ApiResponse({ status: 200, description: 'Retrieved user successfully' })
  @ApiBadRequestResponse({ description: 'User ID is missing or must be an integer' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  getUserById(@Param('user_id') user_id: string) {
    return this.userService.getUserById(+user_id);
  }
  //update user by id
  @UseGuards(RoleGuard)
  @Patch('/:user_id')
  @ApiOperation({ summary: 'Update user information' })
  @ApiBearerAuth()
  @ApiBody({ type: UpdateUserDto })
  @ApiParam({ name: 'user_id', description: 'ID of the user' })
  @ApiResponse({ status: 200, description: 'User updated successfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'User ID is missing or must be an integer' })
  updateUser(@Body() dto: UpdateUserDto, @Param('user_id') user_id: string) {
    return this.userService.updateUser(dto, +user_id);
  }
  //delete user by id
  @UseGuards(RoleGuard)
  @Delete('/:user_id')
  @ApiOperation({ summary: 'Delete user by ID' })
  @ApiBearerAuth()
  @ApiParam({ name: 'user_id', description: 'ID of the user' })
  @ApiResponse({ status: 200, description: 'User deleted successfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'User ID is missing or must be an integer' })
  deleteUserById(@Param('user_id') user_id: string) {
    return this.userService.deleteUserById(+user_id);
  }
}
