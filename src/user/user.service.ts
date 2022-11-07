import { HttpStatus, Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { CreateUserDto } from './dto/user.dto';
import { UserEntity } from './entities/user.entity';
import HttpException from 'src/exceptions/httpException';
import * as moment from 'moment';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  userRepository;
  constructor(connection: Connection) {
    this.userRepository = connection.getRepository(UserEntity);
  }

  async createUser(userData: CreateUserDto) {
    try {
      console.log('createUserService');

      const isEmailExist = await this.userRepository.findOne({
        email: userData.email,
      });
      if (isEmailExist) {
        throw {
          message: 'Email already exists',
        };
      }
      const encryptedPassword = await bcrypt.hash(userData.password, 10);

      const createdData = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        password: encryptedPassword,
        createdAt: new Date(moment().format('YYYY-MM-DD HH:mm:ss')),
      };
      const user = await this.userRepository.save(createdData);
      return user;
    } catch (error) {
      console.log('createUserService:Error');
      throw new HttpException(
        error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
        error.message ? error.message : error,
      );
    }
  }

  async findUser(userId: number) {
    try {
      console.log('findUserService');
      const user = await this.userRepository.findOne({ userId: userId });
      return user;
    } catch (error) {
      console.log('findUserService:Error');
      throw new HttpException(
        error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
        error.message ? error.message : error,
      );
    }
  }

  async verifyUser(email: string, password: string) {
    try {
      console.log('verifyUserService');
      const userData = await this.userRepository.findOne({ email: email });
      console.log(userData);
      if (userData) {
        const isMatch = await bcrypt.compare(password, userData.password);
        if (isMatch) {
          delete userData.password;
          return { user: userData };
        }
        return { wrongPassword: true };
      }
      return { wrongEmail: true };
    } catch (error) {
      console.log('verifyUserService:Error');
      throw new HttpException(
        error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
        error.message ? error.message : error,
      );
    }
  }
}
