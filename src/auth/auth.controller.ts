/* eslint-disable prettier/prettier */
import { Controller, UseGuards, Post, Req, Body, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport/dist';
import { JwtAuthGuard } from 'src/jwtAuthGuard';
import { AuthService } from './auth.service';
import { CreateUDto, CreateUserDto, LoginDto, RegisterResponseDto, ResetPasswordDto, verifyEmailDto } from './dtos/dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiConflictResponse, ApiForbiddenResponse, ApiOkResponse, ApiOperation, ApiParam, ApiResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }
  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, description: 'Logged in successfully' })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  @ApiForbiddenResponse({ description: 'User already logged in' })
  async login(@Req() req) {
    return this.authService.login(req.user);
  }
  @Post('client/register')
  @ApiOperation({ summary: 'Register a new client' })
  @ApiBody({ type: CreateUDto })
  @ApiResponse({ status: 201, description: 'User has been created successfully', type: RegisterResponseDto })
  @ApiConflictResponse({ description: 'User already exists' })
  clientRegister(@Body() createUserDto: CreateUserDto) {
    return this.authService.clientRegister(createUserDto);
  }
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @ApiOperation({ summary: 'User logout' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Logged out successfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  logout(@Req() req) {
    return this.authService.logout(req.user);
  }
  //---------------password reset routes----------------------
  @Post('verifyEmail')
  @ApiOperation({ summary: 'Verify email address and send verification code' })
  @ApiBody({ type: verifyEmailDto })
  @ApiResponse({ status: 200, description: 'Verification code sent successfully' })
  @ApiBadRequestResponse({ description: 'No user with this email' })
  verifyEmail(@Body() verifyEmail: verifyEmailDto) {
    return this.authService.verifyEmail(verifyEmail);
  }
  @Post('verifyResetPassword/:token')
  @ApiOperation({ summary: 'Verify reset password token' })
  @ApiBody({ type: verifyEmailDto })
  @ApiParam({ name: 'token', description: 'Verification token' })
  @ApiResponse({ status: 200, description: 'Valid numbers, reset password now' })
  @ApiBadRequestResponse({ description: 'User doesn\'t exist or invalid token' })
  verifyResetPassword(
    @Body() verifyEmail: verifyEmailDto,
    @Param('token') token: string,
  ) {
    return this.authService.verifyResetPassword(verifyEmail, token);
  }
  @Post('resetPassword/:token')
  @ApiOperation({ summary: 'Reset user password' })
  @ApiBody({ type: ResetPasswordDto })
  @ApiParam({ name: 'token', description: 'Verification token' })
  @ApiResponse({ status: 200, description: 'Reset password successfully' })
  @ApiBadRequestResponse({ description: 'User doesn\'t exist or invalid token' })
  resetPassword(
    @Body() resetPasswordDto: ResetPasswordDto,
    @Param('token') token: string,
  ) {
    return this.authService.resetPassword(resetPasswordDto, token);
  }
}
