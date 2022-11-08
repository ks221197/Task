import {
  forwardRef,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthModule } from '../auth/auth.module';
import { AuthMiddleware } from 'src/middlewares/auth.middleware';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [forwardRef(() => AuthModule), HttpModule],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AuthMiddleware).forRoutes('users/me');
  }
}
