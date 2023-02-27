import { Module } from '@nestjs/common';
import { BookmarkModule } from './bookmark/bookmark.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import AuthModule from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MiddlewareModule } from './middleware/middleware.module';

@Module({
  imports: [
    AuthModule,
    BookmarkModule,
    UserModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MiddlewareModule,
  ],
})
export class AppModule {}
