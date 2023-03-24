import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorators';
import { JwtGuard } from 'src/auth/guard';
import { pipeline } from 'stream';
import { BookmarkService } from './bookmark.service';
import { CreateBookmarkDto } from './dto/createBookmark.dto';

@UseGuards(JwtGuard)
@Controller('bookmark')
export class BookmarkController {
  constructor(private bookmarkService: BookmarkService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('create')
  async create(
    @GetUser('id') userId: number,
    @Body()
    body: CreateBookmarkDto,
  ) {
    try {
      const { description, title, link } = body;
      const res = await this.bookmarkService.executeCreate(
        userId,
        description,
        title,
        link,
      );

      return { res };
    } catch (error) {
      console.log(error);

      return error;
    }
  }

  @HttpCode(HttpStatus.OK)
  @Get('get')
  async get(@GetUser('id') userId: number) {
    try {
      const res = await this.bookmarkService.executeFetch(userId);

      return { res };
    } catch (error) {
      return { message: 'Cannot Fetch resourece at the moment.' };
    }
  }

  @HttpCode(HttpStatus.OK)
  @Get('get-one')
  async getOne(
    @GetUser('id') userId: number,
    @Query()
    body: {
      link: string;
      description: string;
      title: string;
      bookmark_id: string;
    },
  ) {
    try {
      const res = await this.bookmarkService.executeFetchOne(userId, body);

      return { res };
    } catch (error) {
      return { message: 'Cannot Fetch resourece at the moment.' };
    }
  }

  @HttpCode(HttpStatus.OK)
  @Get('get-user-one')
  async getUserOne(
    @GetUser('id') userId: number,
    @Query()
    body: {
      bookmark_id: string;
    },
  ) {
    try {
      const { bookmark_id: id } = body;
      const res = await this.bookmarkService.executeFetchUserOne(
        userId,
        parseInt(id),
      );

      return { res };
    } catch (error) {
      return { message: 'Cannot Fetch resourece at the moment.' };
    }
  }
}
