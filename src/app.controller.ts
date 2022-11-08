import {
  HttpStatus,
  BadRequestException,
  UnauthorizedException,
  Controller,
  Get,
  HttpException,
} from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('')
@ApiResponse({ status: HttpStatus.OK })
@ApiResponse({ status: HttpStatus.BAD_REQUEST, type: BadRequestException })
@ApiResponse({ status: HttpStatus.UNAUTHORIZED, type: UnauthorizedException })
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

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
