/* eslint-disable prettier/prettier */
import { Controller, UseGuards, Post, Req, Body, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport/dist';
import { JwtAuthGuard } from 'src/jwtAuthGuard';
import { AuthService } from './auth.service';
import { CreateUserDto, ResetPasswordDto, verifyEmailDto } from './dtos/dto';
import { ApiOkResponse } from '@nestjs/swagger';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Req() req) {
    return this.authService.login(req.user);
  }
  @Post('client/register')
  clientRegister(@Body() createUserDto: CreateUserDto) {
    return this.authService.clientRegister(createUserDto);
  }
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  logout(@Req() req) {
    return this.authService.logout(req.user);
  }
  //---------------password reset routes----------------------
  @Post('verifyEmail')
  verifyEmail(@Body() verifyEmail: verifyEmailDto) {
    return this.authService.verifyEmail(verifyEmail);
  }
  @Post('verifyResetPassword/:token')
  verifyResetPassword(
    @Body() verifyEmail: verifyEmailDto,
    @Param('token') token: string,
  ) {
    return this.authService.verifyResetPassword(verifyEmail, token);
  }
  @Post('resetPassword/:token')
  resetPassword(
    @Body() resetPasswordDto: ResetPasswordDto,
    @Param('token') token: string,
  ) {
    return this.authService.resetPassword(resetPasswordDto, token);
  }
}
