import {
  BadGatewayException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dtos/auth.dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { ConfigService } from '@nestjs/config';
import { User } from '@prisma/client';

@Injectable()
export default class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  async signup(email: string, password: string): Promise<AuthDto> {
    try {
      const hashedPassword = await argon.hash(password);
      await this.prismaService.user.create({
        data: { email, password: hashedPassword },
        select: { email: true },
      });

      // delete user.email;
      return { email, password };
    } catch (error) {
      if (
        error.constructor.name == 'PrismaClientKnownRequestError' &&
        error.code == 'P2002'
      ) {
        throw new ForbiddenException('Credential Exists');
      }
      throw error;
    }
  }

  async signin(
    email: string,
    password: string,
  ): Promise<{ access_token: string }> {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { email },
      });
      if (!user) {
        throw new ForbiddenException('Credentials  invalid.');
      }

      const passwordMatch = await argon.verify(user.password, password);

      if (!passwordMatch) {
        console.log('9999');

        throw new ForbiddenException('Credentials  invalid.');
      }

      const access_token = await this.signToken(user.id, email);
      // await jwt
      return { access_token };
    } catch (error) {
      throw error;
    }
  }

  async getUser(email: string): Promise<User> {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { email },
      });
      if (!user) {
        throw new ForbiddenException('User not found.');
      }

      return user;
    } catch (error) {
      throw error;
    }
  }

  async signToken(userId: number, email: string): Promise<string> {
    const payload = {
      sub: userId,
      email,
    };

    const token = await this.jwt.sign(payload, {
      expiresIn: '60m',
      secret: this.config.get('JWT_SECRET'),
    });

    return token;
  }
}
