import { Module } from '@nestjs/common';
import { BookmarkModule } from './bookmark/bookmark.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import AuthModule from './auth/auth.module';

@Module({
  imports: [AuthModule, BookmarkModule, UserModule, PrismaModule],
})
export class AppModule {}
