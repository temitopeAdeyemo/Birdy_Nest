import { Body, Controller, Post } from '@nestjs/common';
import AuthService from './auth.service';
import { AuthDto, SignupDto } from './dtos';

@Controller('auth')
class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: SignupDto) {
    return this.authService.signup();
  }

  @Post('login')
  login(@Body() dto: AuthDto) {
    return this.authService.signin();
  }
}

export default AuthController;
