/* eslint-disable prettier/prettier */
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
  @IsString()
  @IsNotEmpty()
  username: string;
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @Validate(PasswordValidation, [passwordRequirement])
  password: string;
  @IsNotEmpty()
  @IsEnum(Role)
  role: any = Role[1];
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
export class ForgetPasswordDto {
  @IsEmail()
  email: string;
}
export class ResetPasswordDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @Validate(PasswordValidation, [passwordRequirement])
  password: string;
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
export class verifyEmailDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
