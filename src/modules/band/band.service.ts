import { HttpService } from '@nestjs/axios';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { Path } from 'src/urls/urls';
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
    const data = await this.httpService.axiosRef.post(Path.band, bandmRen, {
      headers: {
        Authorization: `Token ${process.env.token}`,
      },
    });

    return this.getBand({ id: data.data._id });
  }
  async updateBand(body: UpdateInputBand): Promise<Band> {
    if (!process.env.token) throw new ForbiddenException();
    const bandRen = await this.renameField(body);

    const data = await this.httpService.axiosRef.put(
      Path.band + body.id,
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
    const data = await this.httpService.axiosRef.get(Path.band + id.id);
    const props = await this.getByid(data.data);

    return { ...props };
  }

  async getBands(getBands): Promise<Band[]> {
    const data = await this.httpService.axiosRef.get(
      `${Path.band}?limit=${getBands.limit}&offset=${getBands.offset}`,
    );

    const ans = await Promise.all(
      data.data.items.map(async (item) => {
        const props = await this.getByid(item);

        return {
          ...props,
        };
      }),
    );
    return ans;
  }

  async removeBands(id: DeleteBandInput): Promise<DeleteBandInput> {
    const data = await this.httpService.axiosRef.delete(Path.band + id.id, {
      headers: {
        Authorization: `Token ${process.env.token}`,
      },
    });
    return id;
  }
  async getByid(data) {
    let genres: Genre[];
    if (data.genresIds && data.genresIds !== null) {
      genres = await Promise.all(
        data.genresIds.map(
          async (i) =>
            (await this.genreService.getGenre({ id: i })) || {
              id: 'not found',
            },
        ),
      );
      delete data['genresIds'];
      data.genres = genres;
    }

    data.id = data._id;
    delete data['_id'];
    return data;
  }
  async renameField(Obj) {
    Obj['genresIds'] = Obj.genres;
    delete Obj['genres'];

    return Obj;
  }
}
