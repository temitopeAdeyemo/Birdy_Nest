import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { EditUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}
  async editUser(userId: number, dto: EditUserDto) {
    const user = await this.prismaService.user.updateMany({
      where: {
        id: userId,
      },
      data: { ...dto },
    });
    console.log(222, user);

    return user;
  }
}
