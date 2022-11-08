import { HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import HttpException from './exceptions/httpException';
@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  async getJokes() {
    try {
      console.log('getJokesService');

      const apiResponse = await this.curlRequest({
        url: 'https://api.chucknorris.io/jokes/random',
        method: 'get',
      });

      return apiResponse?.value;
    } catch (error) {
      console.log('getJokesService:Error');
      throw new HttpException(
        error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
        error.message ? error.message : error,
      );
    }
  }

  curlRequest = async (data): Promise<any> => {
    try {
      const response = await lastValueFrom(this.httpService.request(data));
      return response?.data;
    } catch (error) {
      console.log('curlRequestUtils:Error');
      throw new HttpException(
        error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
        error.message ? error.message : error,
      );
    }
  };
}
