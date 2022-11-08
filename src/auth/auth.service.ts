import { HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/auth.dto';
import HttpException from 'src/exceptions/httpException';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginData: LoginDto) {
    try {
      console.log('loginService');
      const isUserExists = await this.userService.verifyUser(
        loginData.email,
        loginData.password,
      );

      if (isUserExists && isUserExists?.user) {
        const payload = {
          email: isUserExists?.user.email,
          userId: isUserExists?.user.userId,
        };

        const token = this.jwtService.sign(payload);

        return {
          ...isUserExists?.user,
          token,
        };
      }

      if (isUserExists?.wrongEmail || isUserExists?.wrongPassword) {
        throw {
          message: 'invalid credential',
          status: HttpStatus.UNAUTHORIZED,
        };
      }
      throw { message: 'No user found', status: HttpStatus.NOT_FOUND };
    } catch (error) {
      console.log('loginService:Error');
      throw new HttpException(
        error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
        error.message ? error.message : error,
      );
    }
  }

  async verifyToken(token) {
    try {
      console.log('loginService');

      const userData = this.jwtService.verify(token);

      return {
        ...userData,
      };
    } catch (error) {
      console.log('loginService:Error');
      throw new HttpException(
        error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
        error.message ? error.message : error,
      );
    }
  }
}
