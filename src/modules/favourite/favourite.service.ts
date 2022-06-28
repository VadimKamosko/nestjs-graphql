import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Favourite } from './models/favourite';

@Injectable()
export class FavouriteService {
  constructor(private readonly httpService: HttpService) {}
  async getFavs():Promise<Favourite>{
    const data = await this.httpService.axiosRef.get(
      'http://localhost:3007/v1/favourites',
      {
        headers: {
          Authorization: `Token ${process.env.token}`,
        },
      },
    );
    return data.data
  }
}
