import { Injectable } from '@nestjs/common';

Injectable({});
class AuthService {
  signup() {
    return 'I am up...';
  }

  signin() {
    return 'I am in...';
  }
}

export default AuthService;
