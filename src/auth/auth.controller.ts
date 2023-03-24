import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { query } from 'express';
import AuthService from './auth.service';
import { AuthDto, SignupDto } from './dtos';

@Controller('auth')
class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: SignupDto) {
    const { email, password } = dto;
    return this.authService.signup(email, password);
  }

  @Post('signin')
  login(@Body() dto: AuthDto) {
    const { email, password } = dto;
    return this.authService.signin(email, password);
  }

  @Get('me')
  get(@Query() email: { email: string }) {
    console.log(email.email);

    if (!email.email) {
      return null;
    }
    return this.authService.getUser(email.email);
  }
}

export default AuthController;
