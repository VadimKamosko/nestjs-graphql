import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { GetBandArg } from './DTO/get-bandarg';
import { CreateInputBand } from './input/create-bandinput';
import { DeleteBandInput } from './input/delete-bandinput';
import { UpdateInputBand } from './input/update-bandinput';
import { Band } from './models/band';

@Injectable()
export class BandService {
  constructor(private readonly httpService: HttpService) {}

  async createBand(body: CreateInputBand): Promise<Band> {
    const data = await this.httpService.axiosRef.post(
      'http://localhost:3003/v1/bands',
      body,
      {
        headers: {
          Authorization: `Token ${process.env.token}`,
        },
      },
    );
    return data.data;
  }
  async updateBand(body: UpdateInputBand): Promise<Band> {
    const data = await this.httpService.axiosRef.put(
      'http://localhost:3003/v1/bands/' + body._id,
      body,
      {
        headers: {
          Authorization: `Token ${process.env.token}`,
        },
      },
    );
    return data.data;
  }
  async getBand(id: GetBandArg): Promise<Band> {
    const data = await this.httpService.axiosRef.get(
      'http://localhost:3003/v1/bands/'+id._id,
    );

    return data.data;
  }

  async getBands(): Promise<Band[]> {
    const data = await this.httpService.axiosRef.get(
      'http://localhost:3003/v1/bands',
    );

    return data.data.items;
  }

  async removeBands(id: DeleteBandInput): Promise<DeleteBandInput> {
    const data = await this.httpService.axiosRef.delete(
      'http://localhost:3003/v1/bands/' + id._id,
      {
        headers: {
          Authorization: `Token ${process.env.token}`,
        },
      },
    );
    return id;
  }
}
