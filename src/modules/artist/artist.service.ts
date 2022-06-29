import { Injectable } from '@nestjs/common';
import { CreateArtistInput } from './input/create-artist.input';
import { Artist } from './models/artist';
import { UpdateArtistinput } from './input/update-artistinput';
import { GetArtistArgs } from './DTO/get-artist.args';
import { GetArtistsArgs } from './DTO/get-artists.args';
import { DeleteArtistInput } from './input/delete-artistinput';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';

@Injectable()
export class ArtistService {
  constructor(private readonly httpService: HttpService) {}


  public async createArtist(
    createArtist: CreateArtistInput,
  ): Promise<AxiosResponse<Artist>> {
    const data = await this.httpService.axiosRef.post(
      'http://localhost:3002/v1/artists',
      createArtist,
      {
        headers: {
          Authorization: `Token ${process.env.token}`,
        },
      },
    );

    return data.data;
  }
  public async updateArtist(
    updateArt: UpdateArtistinput,
  ): Promise<AxiosResponse<Artist>> {
    const data = await this.httpService.axiosRef.put(
      'http://localhost:3002/v1/artists/' + updateArt._id,
      updateArt,
      {
        headers: {
          Authorization: `Token ${process.env.token}`,
        },
      },
    );

    return data.data;
  }
  public async getArtist(
    getArtistArg: GetArtistArgs,
  ): Promise<AxiosResponse<Artist>> {
    const data = await this.httpService.axiosRef.get(
      'http://localhost:3002/v1/artists/' + getArtistArg._id,
    );

    return data.data;
  }
  public async getArtists(
    getArtistsArgs: GetArtistsArgs,
  ): Promise<AxiosResponse<Artist[]>> {
    const data = await this.httpService.axiosRef.get(
      'http://localhost:3002/v1/artists',
    );

    return data.data.items;
  }
  public async deleteArist(
    getArtistsArgs: DeleteArtistInput,
  ): Promise<DeleteArtistInput> {
    const data = await this.httpService.axiosRef.delete(
      'http://localhost:3002/v1/artists/' + getArtistsArgs._id,
      {
        headers: {
          Authorization: `Token ${process.env.token}`,
        },
      },
    );

    return getArtistsArgs;
  }
}
