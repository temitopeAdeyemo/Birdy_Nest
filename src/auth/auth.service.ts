import {
  BadGatewayException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dtos/auth.dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable()
export default class AuthService {
  constructor(private prismaService: PrismaService) {}
  async signup(email: string, password: string): Promise<AuthDto> {
    try {
      const hashedPassword = await argon.hash(password);
      const user = await this.prismaService.user.create({
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

  async signin(email: string, password: string): Promise<AuthDto> {
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
      // await jwt
      return { email, password };
    } catch (error) {
      throw error;
    }
  }
}
