import {
  forwardRef,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthModule } from '../auth/auth.module';
import { AuthMiddleware } from 'src/middlewares/auth.middleware';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [forwardRef(() => AuthModule), HttpModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AuthMiddleware).forRoutes('users/me');
  }
}
