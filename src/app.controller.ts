import {
  Body,
  Controller,
  Get,
  Headers,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { LoginDto } from './auth/dto/auth.dto';
import { JwtAuthGuard } from './auth/guards/jwt.guard';
import { CreateUserDto } from './user/dto/user.dto';
import { UserService } from './user/user.service';

@ApiTags('User')
@Controller('api')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('signup')
  create(@Body() userData: CreateUserDto) {
    try {
      console.log('createController');
      return this.userService.createUser(userData);
    } catch (error) {
      console.log('createController:Error');
      throw new HttpException(
        error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
        error.message ? error.message : error,
      );
    }
  }

  @Post('login')
  login(@Body() loginData: LoginDto) {
    try {
      console.log('loginController');
      return this.authService.login(loginData);
    } catch (error) {
      console.log('loginController:Error');
      throw new HttpException(
        error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
        error.message ? error.message : error,
      );
    }
  }

  @Get('me')
  findMe(@Headers() userData) {
    try {
      console.log('findMeController');
      return this.userService.findUser(+userData.userId);
    } catch (error) {
      console.log('findMeController:Error');
      throw new HttpException(
        error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
        error.message ? error.message : error,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') userId: string) {
    try {
      console.log('findOneController');
      return this.userService.findUser(+userId);
    } catch (error) {
      console.log('findOneController:Error');
      throw new HttpException(
        error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
        error.message ? error.message : error,
      );
    }
  }

  @Get('random-joke')
  async getJokes() {
    try {
      console.log('getJokesController');
      return await this.appService.getJokes();
    } catch (error) {
      console.log('getJokesController:Error');
      throw new HttpException(
        error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
        error.message ? error.message : error,
      );
    }
  }
}
