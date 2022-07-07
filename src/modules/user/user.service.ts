import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './input.ts/create-userinput';
import { User } from './models/user';
import { AxiosResponse } from 'axios';
import { GetJWT } from './DTO/get-jwttoken.args';

@Injectable()
export class UserService {
  constructor(private readonly httpService: HttpService) {}

  async createUser(bodyUser: CreateUserInput): Promise<AxiosResponse<User>> {
    const data = await this.httpService.axiosRef.post(
      'http://localhost:3004/v1/users/register',
      bodyUser,
    );
    data.data.id = data.data._id
    delete data.data._id
    return data.data;
  }
  async getJWT(bodyLog: GetJWT): Promise<AxiosResponse<String>> {
    const data = await this.httpService.axiosRef.post(
      'http://localhost:3004/v1/users/login',
      bodyLog,
    );
    process.env.token = data.data.jwt;    
    return data.data.jwt;
  }
}
