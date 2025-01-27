/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import {
  PasswordValidation,
  PasswordValidationRequirement,
} from 'class-validator-password-check';
const passwordRequirement: PasswordValidationRequirement = {
  mustContainLowerLetter: true,
  mustContainNumber: true,
  mustContainSpecialCharacter: true,
  mustContainUpperLetter: true,
};
export enum Role {
  MODERATOR,
  USER,
}

export class CreateUserDto {
  @ApiProperty({ description: 'Username of the user', example: 'john_doe' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ description: 'Email address of the user', example: 'user@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'Password of the user', minLength: 6, maxLength: 20, example: 'strongpassword123' })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(20)
  @Validate(PasswordValidation, [passwordRequirement])
  password: string;

  @ApiProperty({ description: 'Role of the user', enum: Role, default: Role.USER })
  @IsNotEmpty()
  @IsEnum(Role)
  role: any = Role[1];
}

export class RegisterResponseDto {
  @ApiProperty({ description: 'User ID', example: 1 })
  id: number;

  @ApiProperty({ description: 'Username of the user', example: 'john_doe' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ description: 'Email address of the user', example: 'user@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'Password of the user', minLength: 6, maxLength: 20, example: 'hashed password' })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(20)
  @Validate(PasswordValidation, [passwordRequirement])
  password: string;

  @ApiProperty({ description: 'Role of the user', enum: Role, default: Role.USER })
  @IsNotEmpty()
  @IsEnum(Role)
  role: any = Role[1];

  @ApiProperty({ description: 'Access token' })
  access_token: string;

  @ApiProperty({ description: 'Success message', example: 'user has been created successfully' })
  message: string;

}
export class UpdateUserDto {
  @IsString()
  @IsOptional()
  username: string;
  @IsEmail()
  @IsOptional()
  email: string;
  @IsOptional()
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @Validate(PasswordValidation, [passwordRequirement])
  password: string;
  @IsOptional()
  @IsEnum(Role)
  role: any;
}
export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ description: 'User email', example: 'user@example.com' })
  email: string;
  @IsNotEmpty()
  @ApiProperty({ description: 'User password', example: 'Ab#123456' })
  @Validate(PasswordValidation, [passwordRequirement])
  password: string;
}
export class CreateUDto {
  @ApiProperty({ description: 'Username of the user', example: 'john_doe' })
  @IsString()
  @IsNotEmpty()
  username: string;
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ description: 'User email', example: 'user@example.com' })
  email: string;
  @IsNotEmpty()
  @ApiProperty({ description: 'User password', example: 'Ab#123456' })
  @Validate(PasswordValidation, [passwordRequirement])
  password: string;
  @ApiProperty({ description: 'Role of the user', enum: Role, default: Role.USER })
  @IsNotEmpty()
  @IsEnum(Role)
  role: any = 'USER';
}
export class ForgetPasswordDto {
  @IsEmail()
  email: string;
}
export class ResetPasswordDto {
  @ApiProperty({ description: 'Email address of the user', example: 'user@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'New password of the user', minLength: 6, maxLength: 20, example: 'newpassword#123' })
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(20)
  password: string;
}
export class verifyEmailDto {
  @ApiProperty({ description: 'Email address of the user', example: 'user@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
