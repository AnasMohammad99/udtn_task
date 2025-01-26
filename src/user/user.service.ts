import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { DatabaseService } from 'src/database/database.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { handleError } from 'src/exceptions/errors-handler';

@Injectable()
export class UserService {
  constructor(private database: DatabaseService) {}
  async getAllUsers() {
    try {
      const users = await this.database.user.findMany({});
      return { data: users };
    } catch (error) {
      handleError(error);
    }
  }
  async addUser(dto: CreateUserDto, request: any) {
    try {
      if (request.user.role === 'OPERATOR') {
        throw new HttpException(
          `OPERATOR role can't create users`,
          HttpStatus.UNAUTHORIZED,
        );
      }
      const userExist = await this.database.user.findFirst({
        where: {
          username: dto.username,
        },
      });
      if (userExist) {
        throw new HttpException('user already exist', HttpStatus.BAD_REQUEST);
      }
      const saltOrRounds = 10;
      dto.password = await bcrypt.hash(dto.password, saltOrRounds);
      const user = await this.database.user.create({
        data: {
          username: dto.username,
          password: dto.password,
          email: dto.email,
          role: dto.role,
        },
      });
      return { message: 'user added', data: user };
    } catch (error) {
      handleError(error);
    }
  }
  async getUserById(user_id: number) {
    try {
      const user = await this.database.user.findUnique({
        where: {
          id: user_id,
        },
      });
      return { data: user };
    } catch (error) {
      handleError(error, 'user_id is missing or must be an integer');
    }
  }
  async updateUser(dto: UpdateUserDto, user_id: number) {
    try {
      const updatedUser = await this.database.user.update({
        where: {
          id: user_id,
        },
        data: {
          username: dto.username,
          role: dto.role,
        },
      });
      return { message: 'user updated', data: updatedUser };
    } catch (error) {
      handleError(error, 'user_id is missing or must be an integer');
    }
  }
  async deleteUserById(user_id: number) {
    try {
      await this.database.token.deleteMany({
        where: {
          user_id: user_id,
        },
      });
      const deletedUser = await this.database.user.delete({
        where: {
          id: user_id,
        },
      });
      return { message: 'user deleted', data: deletedUser };
    } catch (error) {
      handleError(error, 'user_id is missing or must be an integer');
    }
  }
}
