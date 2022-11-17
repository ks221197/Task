import {
  HttpStatus,
  BadRequestException,
  UnauthorizedException,
  Controller,
  Post,
  Body,
  HttpException,
  Get,
  UseGuards,
  Param,
  Headers,
} from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { LoginDto } from 'src/auth/dto/auth.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { CreateUserDto } from './dto/user.dto';
import { UserService } from './user.service';

@ApiTags('User')
@ApiResponse({ status: HttpStatus.OK })
@ApiResponse({ status: HttpStatus.BAD_REQUEST, type: BadRequestException })
@ApiResponse({ status: HttpStatus.UNAUTHORIZED, type: UnauthorizedException })
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService, //this is feature frm typescript which creates varivle and assign value, go to https://www.typescriptlang.org/docs/handbook/2/classes.html#constructors in that we created const x; but her without creaating variable directly assigned
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
}
