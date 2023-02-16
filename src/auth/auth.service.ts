import { Injectable } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';

Injectable({});
class AuthService {
  constructor(private prismaModule: PrismaModule) {}
  signup() {
    return 'I am up...';
  }

  signin() {
    return 'I am in...';
  }
}

export default AuthService;
