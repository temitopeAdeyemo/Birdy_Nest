import { Module } from '@nestjs/common';
import { BookmarkModule } from './bookmark/bookmark.module';
import { UserModule } from './user/user.module';
import AuthModule from './auth/auth.module';

@Module({
  imports: [AuthModule, BookmarkModule, UserModule],
})
export class AppModule {}
