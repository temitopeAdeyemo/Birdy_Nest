import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { request } from 'http';
import { GetUser } from 'src/auth/decorators';
import { JwtGuard } from 'src/auth/guard';
import { EditUserDto } from './dto';
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @HttpCode(HttpStatus.OK)
  @Get('me')
  //   getMe(@GetUser() user: User) {
  getMe(@GetUser('email') user: string) {
    //   getMe(@Request() req) {
    //     console.log(req.user);
    return { user };
    // return req.user;
  }

  @HttpCode(HttpStatus.OK)
  @Patch('/update-user')
  async updateUser(@GetUser('id') userId: number, @Body() dto: EditUserDto) {
    await this.userService.editUser(userId, dto);

    return { message: 'User updated successfully.' };
  }
}
