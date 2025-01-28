/* eslint-disable prettier/prettier */
import { Cron, CronExpression } from '@nestjs/schedule';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { HttpException } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { MailerService } from '@nestjs-modules/mailer';
// import { CreateUserDto, ResetPasswordDto, verifyEmailDto } from './dtos/auth.dto';
import { handleError } from 'src/exceptions/errors-handler';
import {
  CreateUserDto,
  ResetPasswordDto,
  verifyEmailDto,
} from './dtos/auth.dto';
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private database: DatabaseService,
    private mailerService: MailerService,
  ) { }
  async validateUser(email: string, password: string) {
    try {
      const user = await this.database.user.findFirst({
        where: { email },
      });
      if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
          return user;
        }
      }
      return null;
    } catch (err) {
      return err;
    }
  }
  async validateToken(id: number, role: string, expire_at?: string) {
    try {
      const token = await this.database.token.findUnique({
        where: {
          id,
        },
      });
      return token;
    } catch (err) {
      return err;
    }
  }
  async clientRegister(dto: CreateUserDto) {
    const userExist = await this.database.user.findFirst({
      where: {
        email: dto.email,
      },
    });
    if (userExist) {
      throw new HttpException('user already exists', HttpStatus.BAD_REQUEST);
    }
    const saltOrRounds = 10;
    if (dto.role === 1) {
      dto.role = 'USER'
    } else if (dto.role === 2) {
      dto.role = 'MODERATOR'
    }
    dto.password = await bcrypt.hash(dto.password, saltOrRounds);
    const user = await this.database.user.create({
      data: {
        ...dto,
      },
    });
    const token = await this.database.token.create({
      data: {
        user_id: user.id,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
      },
    });
    return {
      ...user,
      access_token: this.jwtService.sign({
        user: { user_id: user.id, token_id: token.id, role: user.role },
      }),
      message: 'user has been created successfully',
    };
  }
  async login(user: any): Promise<any> {

    try {
      const token = await this.database.token.create({
        data: {
          user_id: user.id,
          expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
        },
      });
      delete user.password;
      return {
        message: 'logged in successfully',
        ...user,
        access_token: this.jwtService.sign({
          user: { user_id: user.id, token_id: token.id, role: user.role },
        }),
      };

    } catch (error) {
      const loggedUser = await this.database.user.findUnique({
        where: {
          id: +user.id,
        },
      });
      if (loggedUser) {
        throw new HttpException(`${loggedUser.username} already logged in`, HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException('Invalid email or password', HttpStatus.UNAUTHORIZED);
      }
    }
  }
  async logout(user: any) {
    try {
      // console.log(user);

      await this.database.token.delete({
        where: {
          user_id: +user.user_id,
        },
      });

      return { message: 'logged out successfully' };
    } catch (err) {
      throw new HttpException(err, HttpStatus.UNAUTHORIZED);
    }
  }
  async verifyEmail(verifyEmail: verifyEmailDto) {
    try {
      const user = await this.database.user.findUnique({
        where: { email: verifyEmail.email },
      });
      if (!user) {
        throw new HttpException(
          `no user with this email `,
          HttpStatus.BAD_REQUEST,
        );
      }
      const fourDigits = Math.floor(Math.random() * 9000) + 1000;
      console.log(fourDigits);

      const secret = process.env.ACCESS_SECRET;
      const token = this.jwtService.sign(
        { code: fourDigits },
        {
          secret,
          expiresIn: 60 * 15,
        },
      );
      await this.database.user.update({
        where: { email: verifyEmail.email },
        data: {
          emailVerification: token,
        },
      });
      try {
        await this.mailerService.sendMail({
          to: user.email,
          from: process.env.HOST_EMAIL,
          subject: 'verify code',
          text: `Verification Code Is : ${fourDigits}`,
        });
      } catch (err) {
        console.error(err);
      }
      return { message: 'verification code sent successfully' };
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
  async verifyResetPassword(verifyEmail: verifyEmailDto, token: string) {
    try {
      const user = await this.database.user.findUnique({
        where: { email: verifyEmail.email },
      });
      const secret = process.env.ACCESS_SECRET;
      const payload = await this.jwtService.verify(user.emailVerification, {
        secret,
      });
      if (payload.code != token) {
        throw new HttpException("user doesn't exist", HttpStatus.BAD_REQUEST);
      }
      return { message: 'valid numbers reset password now' };
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
  async resetPassword(resetPasswordDto: ResetPasswordDto, token: string) {
    try {
      const user = await this.database.user.findFirst({
        where: { email: resetPasswordDto.email },
      });
      const secret = process.env.ACCESS_SECRET;
      const payload = await this.jwtService.verify(user.emailVerification, {
        secret,
      });
      if (payload.code != token) {
        throw new HttpException("user doesn't exist", HttpStatus.BAD_REQUEST);
      }
      const saltOrRounds = 10;
      resetPasswordDto.password = await bcrypt.hash(
        resetPasswordDto.password,
        saltOrRounds,
      );
      const updatedUser = await this.database.user.update({
        where: { email: resetPasswordDto.email },
        data: {
          password: resetPasswordDto.password,
          emailVerification: null,
        },
      });
      delete user.password;
      return { ...updatedUser, message: 'reset password successfully' };
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
  @Cron(CronExpression.EVERY_10_MINUTES)
  async deleteExpiredTokens() {
    try {
      console.log('Checking for expired tokens...');
      const expiredTokens = await this.database.token.findMany({
        where: {
          expiresAt: {
            lte: new Date(),
          },
        },
      });
      if (expiredTokens.length > 0) {
        console.log(`Found ${expiredTokens.length} expired tokens`);
        for (const token of expiredTokens) {
          await this.database.token.delete({
            where: {
              id: token.id,
            },
          });
        }
        console.log('Deleted expired tokens');
      } else {
        console.log('No expired tokens found');
      }
    } catch (err) {
      return err;
    }
  }
}
