import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthMiddleware } from 'src/middleware/middleware.service';
// import { Auth from 'src/middleware/middleware.module';
import AuthController from './auth.controller';
import AuthService from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
export default AuthModule;
