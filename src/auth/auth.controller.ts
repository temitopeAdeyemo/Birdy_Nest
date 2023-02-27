import { Body, Controller, Get, Post } from '@nestjs/common';
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

  @Get('signin')
  get(@Body() dto: AuthDto) {
    return 'his.authService.signin(email, password)';
  }
}

export default AuthController;
