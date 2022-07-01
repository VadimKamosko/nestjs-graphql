import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { GetTrackArg } from './DTO/get-trackargs';
import { GetTracksArg } from './DTO/get-tracksargs';
import { CreateTrackInput } from './input/create-trackinput';
import { Track } from './models/track';
import { UpdateTrackInput } from './input/update-trackinput';
import { DeleteTrackInput } from './input/delete-trackinput';
import { HttpService } from '@nestjs/axios';
import { BandService } from '../band/band.service';
import { Band } from '../band/models/band';
import { Genre } from '../genre/models/genre';
import { GenreService } from '../genre/genre.service';
import { Album } from '../album/models/album';
import { AlbumService } from '../album/album.service';

@Injectable()
export class TrackService {
  constructor(
    private readonly httpServise: HttpService,
    private readonly bandService: BandService,
    private readonly genresService: GenreService,
    //private readonly albService: AlbumService
  ) {}
  private albService: AlbumService;
  private tracks: Track[] = [];

  async getTrack(id: GetTrackArg): Promise<Track> {
    const data = await this.httpServise.axiosRef.get(
      'http://localhost:3006/v1/tracks/' + id.id,
    );

    if (!data.data) return null;
    const props = await this.getdataById(data.data);

    return { ...data.data, ...props };
  }

  async getTracks(tracks: GetTracksArg): Promise<Track[]> {
    const data = await this.httpServise.axiosRef.get(
      'http://localhost:3006/v1/tracks',
    );

    const ans = await Promise.all(
      data.data.items.map(async (item) => {
        const props = await this.getdataById(item);

        return {
          ...item,
          ...props,
        };
      }),
    );
    return ans;
  }

  async createTrack(bodyTrack: CreateTrackInput): Promise<Track> {
    const trackRen = await this.renameField(bodyTrack);

    const data = await this.httpServise.axiosRef.post(
      'http://localhost:3006/v1/tracks',
      trackRen,
      {
        headers: {
          Authorization: `Token ${process.env.token}`,
        },
      },
    );

    return this.getTrack({ id: data.data._id });
  }

  async updateTrack(bodyTrack: UpdateTrackInput): Promise<Track> {
    const trackRen = await this.renameField(bodyTrack);

    const data = await this.httpServise.axiosRef.put(
      'http://localhost:3006/v1/tracks/' + bodyTrack.id,
      trackRen,
      {
        headers: {
          Authorization: `Token ${process.env.token}`,
        },
      },
    );

    return this.getTrack({ id: bodyTrack.id });
  }
  deleteTrack(bodyDelTracl: DeleteTrackInput): DeleteTrackInput {
    const data = this.httpServise.axiosRef.delete(
      'http://localhost:3006/v1/tracks/' + bodyDelTracl.id,
      {
        headers: {
          Authorization: `Token ${process.env.token}`,
        },
      },
    );
    return bodyDelTracl;
  }

  async getdataById(data) {
    let bands: Band[];
    let genres: Genre[];
    let albums: Album;
    if (data.bandsIds && data.bandsIds !== null) {
      bands = await Promise.all(
        data.bandsIds.map(
          async (i) =>
            (await this.bandService.getBand({ id: i })) || {
              _id: 'not found',
            },
        ),
      );
    }
    if (data.genresIds && data.genresIds !== null) {
      genres = await Promise.all(
        data.genresIds.map(
          async (i) =>
            (await this.genresService.getGenre({ id: i })) || {
              _id: 'not found',
            },
        ),
      );
    }
    if (data.albumsIds && data.albumsIds !== null) {
      albums = await this.albService.getAlbum(data.albumsIds);
    }

    delete data['bandsIds'];
    delete data['genresIds'];
     delete data['albumsIds'];
    return { genres, bands };
  }

  async renameField(Obj) {
    Obj['bandsIds'] = Obj.bands || [];
    Obj['genresIds'] = Obj.genres || [];

    delete Obj['bands'];
    delete Obj['genres'];

    return Obj;
  }
}
