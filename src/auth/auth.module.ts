import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthMiddleware } from 'src/middleware/middleware.service';
// import { Auth from 'src/middleware/middleware.module';
import AuthController from './auth.controller';
import AuthService from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy';
@Module({
  imports: [JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}

// export class AuthModule implements NestModule {
// configure(consumer: MiddlewareConsumer) {
//   consumer.apply(AuthMiddleware).forRoutes('auth/me');
// }
// }
export default AuthModule;
