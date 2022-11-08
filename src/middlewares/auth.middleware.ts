import { NestMiddleware, Injectable, HttpStatus } from '@nestjs/common';
import { NextFunction, Response, Request } from 'express';
import { AuthService } from 'src/auth/auth.service';
import HttpException from 'src/exceptions/httpException';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}
  async use(req: Request, res: Response, next: NextFunction): Promise<void> {
    console.log('AuthMiddleware', '');
    const tokens = req.headers.authorization;
    const accessToken = tokens && tokens.split(' ')[1];

    try {
      if (!tokens || !accessToken) {
        throw new HttpException(
          HttpStatus.INTERNAL_SERVER_ERROR,
          'Invalid token',
        );
      } else {
        const decoded = await this.authService.verifyToken(accessToken);
        req.headers.userId = decoded?.userId;
        next();
      }
    } catch (error) {
      next(
        new HttpException(
          HttpStatus.INTERNAL_SERVER_ERROR,
          error.message ? error.message : error,
        ),
      );
    }
  }
}
