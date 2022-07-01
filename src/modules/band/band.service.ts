import { HttpService } from '@nestjs/axios';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { GenreService } from '../genre/genre.service';
import { Genre } from '../genre/models/genre';
import { GetBandArg } from './DTO/get-bandarg';
import { CreateInputBand } from './input/create-bandinput';
import { DeleteBandInput } from './input/delete-bandinput';
import { UpdateInputBand } from './input/update-bandinput';
import { Band } from './models/band';

@Injectable()
export class BandService {
  constructor(
    private readonly httpService: HttpService,
    private readonly genreService: GenreService,
  ) {}

  async createBand(body: CreateInputBand): Promise<Band> {
    const bandmRen = await this.renameField(body);
    const data = await this.httpService.axiosRef.post(
      'http://localhost:3003/v1/bands',
      bandmRen,
      {
        headers: {
          Authorization: `Token ${process.env.token}`,
        },
      },
    );

    return this.getBand({ id: data.data._id });
  }
  async updateBand(body: UpdateInputBand): Promise<Band> {
    if (!process.env.token) throw new ForbiddenException();
    const bandRen = await this.renameField(body);

    const data = await this.httpService.axiosRef.put(
      'http://localhost:3003/v1/bands/' + body.id,
      bandRen,
      {
        headers: {
          Authorization: `Token ${process.env.token}`,
        },
      },
    );
    
    return this.getBand({ id: data.data._id });
  }
  async getBand(id: GetBandArg): Promise<Band> {
    const data = await this.httpService.axiosRef.get(
      'http://localhost:3003/v1/bands/' + id.id,
    );
    const props = await this.getByid(data.data);

    return { ...data.data, ...props };
  }

  async getBands(): Promise<Band[]> {
    const data = await this.httpService.axiosRef.get(
      'http://localhost:3003/v1/bands',
    );

    const ans = await Promise.all(
      data.data.items.map(async (item) => {
        const props = await this.getByid(item);

        return {
          ...item,
          ...props,
        };
      }),
    );
    return ans;
  }

  async removeBands(id: DeleteBandInput): Promise<DeleteBandInput> {
    const data = await this.httpService.axiosRef.delete(
      'http://localhost:3003/v1/bands/' + id.id,
      {
        headers: {
          Authorization: `Token ${process.env.token}`,
        },
      },
    );
    return id;
  }
  async getByid(data) {
    let genres: Genre[];
    if (data.genresIds && data.genresIds !== null) {
      genres = await Promise.all(
        data.genresIds.map(
          async (i) =>
            (await this.genreService.getGenre({ id: i })) || {
              _id: 'not found',
            },
        ),
      );
    }

    data.id = data._id;
    delete data['_id'];
    delete data['genresIds'];
    return { genres };
  }
  async renameField(Obj) {
    Obj['genresIds'] = Obj.genres || [];
    delete Obj['genres'];

    return Obj;
  }
}
