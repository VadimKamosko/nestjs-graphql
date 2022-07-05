import { Injectable } from '@nestjs/common';
import { CreateArtistInput } from './input/create-artist.input';
import { Artist } from './models/artist';
import { UpdateArtistinput } from './input/update-artistinput';
import { GetArtistArgs } from './DTO/get-artist.args';
import { GetArtistsArgs } from './DTO/get-artists.args';
import { DeleteArtistInput } from './input/delete-artistinput';
import { HttpService } from '@nestjs/axios';
import { Band } from '../band/models/band';
import { BandService } from '../band/band.service';
import { Path } from 'src/urls/urls';

@Injectable()
export class ArtistService {
  constructor(
    private readonly httpService: HttpService,
    private readonly bandService: BandService,
  ) {}

  public async createArtist(createArtist: CreateArtistInput): Promise<Artist> {
    const renArt = await this.renameField(createArtist);
    console.log(renArt);

    const data = await this.httpService.axiosRef.post(Path.artist, renArt, {
      headers: {
        Authorization: `Token ${process.env.token}`,
      },
    });

    return this.getArtist({ id: data.data._id });
  }
  public async updateArtist(updateArt: UpdateArtistinput): Promise<Artist> {
    const renArt = await this.renameField(updateArt);

    const data = await this.httpService.axiosRef.put(
      Path.artist + updateArt.id,
      renArt,
      {
        headers: {
          Authorization: `Token ${process.env.token}`,
        },
      },
    );

    return this.getArtist({ id: data.data._id });
  }
  public async getArtist(getArtistArg: GetArtistArgs): Promise<Artist> {
    const data = await this.httpService.axiosRef.get(
      Path.artist + getArtistArg.id,
    );
    const props = await this.getDataByid(data.data);

    return { ...data.data, ...props };
  }
  public async getArtists(getArtistsArgs: GetArtistsArgs): Promise<Artist[]> {
    const data = await this.httpService.axiosRef.get(
      `${Path.artist}?limit=${getArtistsArgs.limit}&offset=${getArtistsArgs.offset}`,
    );
    return Promise.all(
      data.data.items.map(async (item) => {
        const props = await this.getDataByid(item);
        return { ...item, ...props };
      }),
    );
  }
  public async deleteArist(
    getArtistsArgs: DeleteArtistInput,
  ): Promise<DeleteArtistInput> {
    const data = await this.httpService.axiosRef.delete(
      Path.artist + getArtistsArgs.id,
      {
        headers: {
          Authorization: `Token ${process.env.token}`,
        },
      },
    );

    return getArtistsArgs;
  }
  async getDataByid(data) {
    let bands: Band[];

    if (data.bandsIds && data.bandsIds !== null) {
      bands = await Promise.all(
        data.bandsIds.map(
          async (i) =>
            (await this.bandService.getBand({ id: i })) || {
              id: 'not found',
            },
        ),
      );
    }
    if (!data.id) {
      data.id = data._id;
      delete data['_id'];
    }

    delete data['bandsIds'];

    return { bands };
  }

  async renameField(Obj) {
    Obj['bandsIds'] = Obj.bands;

    delete Obj['bands'];

    return Obj;
  }
}
