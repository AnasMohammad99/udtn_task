import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
// import * as bcrypt from 'bcrypt';
import { HttpException, HttpStatus } from '@nestjs/common';
// import { CreateUserDto } from './dtos/auth.dto';
import { DatabaseService } from 'src/database/database.service';
import { MailerService } from '@nestjs-modules/mailer';

jest.mock('bcrypt', () => ({
  hash: jest.fn().mockResolvedValue('hashed_password'),
  compare: jest.fn().mockImplementation((password, hashedPassword) => {
    return Promise.resolve(password === 'password' && hashedPassword === 'hashed_password');
  }),
}));

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;
  let databaseService: DatabaseService;
  let mailerService: MailerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('mocked_jwt_token'),
          },
        },
        {
          provide: DatabaseService,
          useValue: {
            user: {
              findFirst: jest.fn(),
              create: jest.fn(),
              findUnique: jest.fn(),
            },
            token: {
              create: jest.fn(),
              findUnique: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
        {
          provide: MailerService,
          useValue: {
            sendMail: jest.fn().mockResolvedValue(true),
          },
        }
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
    databaseService = module.get<DatabaseService>(DatabaseService);
  });

  describe('clientRegister', () => {
    it('should throw an error if user already exists', async () => {
      (databaseService.user.findFirst as jest.Mock).mockResolvedValue({ id: 1, email: 'test@example.com' });
      const dto = { username: 'test_user', email: 'test@example.com', password: 'Ab#123456', role: 1 };

      await expect(service.clientRegister(dto)).rejects.toThrow(new HttpException('user already exists', HttpStatus.BAD_REQUEST));
    });

    it('should register a new user successfully', async () => {
      (databaseService.user.findFirst as jest.Mock).mockResolvedValue(null);
      (databaseService.user.create as jest.Mock).mockResolvedValue({ id: 1, username: 'new_user', email: 'new@example.com', role: 'USER' });
      (databaseService.token.create as jest.Mock).mockResolvedValue({ id: 1 });

      const dto = { username: 'new_user', email: 'new@example.com', password: 'Ab#123456', role: 'USER' };
      const result = await service.clientRegister(dto);

      expect(result).toEqual({
        id: 1,
        username: 'new_user',
        email: 'new@example.com',
        role: 'USER',
        access_token: 'mocked_jwt_token',
        message: 'user has been created successfully',
      });
    });
  });

  describe('login', () => {
    it('should log in successfully', async () => {
      const user = { email: 'test@example.com', password: 'Ab#123456' };
      (databaseService.user.findFirst as jest.Mock).mockResolvedValue({ id: 1, email: 'test@example.com', password: 'hashed_password', role: 'USER' });
      (databaseService.token.create as jest.Mock).mockResolvedValue({ id: 1 });

      const result = await service.login(user);

      expect(result).toEqual({
        message: 'logged in successfully',
        email: 'test@example.com',
        access_token: 'mocked_jwt_token',
      });
    });

    it('should throw an error for invalid email or password', async () => {
      const user = { email: 'invalid@example.com', password: 'Ab#123456' };
      (databaseService.user.findFirst as jest.Mock).mockResolvedValue(null);

      await expect(service.login(user)).rejects.toThrow(new HttpException('Invalid email or password', HttpStatus.UNAUTHORIZED));
    });

    it('should throw an error if the user is already logged in', async () => {
      const user = { id: 1, email: 'test@example.com', password: 'hashed_password', username: 'test_user', role: 'USER' };
      (databaseService.token.create as jest.Mock).mockRejectedValue(new Error('Token creation failed'));
      (databaseService.user.findUnique as jest.Mock).mockResolvedValue(user);
      await expect(service.login(user)).rejects.toThrow(
        new HttpException(`${user.username} already logged in`, HttpStatus.BAD_REQUEST),
      );
      expect(databaseService.token.create).toHaveBeenCalledWith({
        data: {
          user_id: user.id,
          expiresAt: expect.any(Date),
        },
      });

      expect(databaseService.user.findUnique).toHaveBeenCalledWith({
        where: { id: user.id },
      });
    });

  });
  describe('logout', () => {
    it('should log out successfully', async () => {
      const user = { user_id: 1 };
      (databaseService.token.delete as jest.Mock).mockResolvedValue({});
      const result = await service.logout(user);
      expect(result).toEqual({ message: 'logged out successfully' });
      expect(databaseService.token.delete).toHaveBeenCalledWith({
        where: { user_id: 1 },
      });
    });

    it('should throw an error if logout fails', async () => {
      const user = { user_id: 1 };
      (databaseService.token.delete as jest.Mock).mockRejectedValue(new Error('Token deletion failed'));
      await expect(service.logout(user)).rejects.toThrow(
        new HttpException('Token deletion failed', HttpStatus.UNAUTHORIZED),
      );
      expect(databaseService.token.delete).toHaveBeenCalledWith({
        where: { user_id: 1 },
      });
    });
  });
});
