import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BookmarkService {
  constructor(private prismaService: PrismaService) {}
  async executeCreate(
    userId: number,
    description: string,
    title: string,
    link: string,
  ) {
    console.log(userId, description, title, link);
    const bookmark = await this.prismaService.bookmark.create({
      data: {
        userId,
        description,
        title,
        link,
      },
    });

    return bookmark;
  }

  async executeFetch(userId: number) {
    try {
      const bookmark = await this.prismaService.bookmark.findMany({
        where: {
          userId,
        },
      });

      return bookmark;
    } catch (error: any) {
      console.log(error.constructor.name, error.message, 55555);

      throw error;
    }
  }

  async executeFetchOne(userId: number, data = {}) {
    try {
      const bookmark = await this.prismaService.bookmark.findMany({
        where: {
          userId,
          ...data,
        },
      });

      return bookmark;
    } catch (error: any) {
      console.log(error.constructor.name, error.message, 55555);

      throw error;
    }
  }

  async executeFetchUserOne(userId: number, id: number) {
    try {
      const bookmark = await this.prismaService.bookmark.findMany({
        where: {
          userId,
          id,
        },
      });
      return bookmark;
    } catch (error: any) {
      console.log(error.constructor.name, error.message, 55555);
      throw error;
    }
  }
}
