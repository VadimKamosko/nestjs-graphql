import { HttpService } from '@nestjs/axios';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ArtistService } from '../artist/artist.service';
import { Artist } from '../artist/models/artist';
import { BandService } from '../band/band.service';
import { Band } from '../band/models/band';
import { GenreService } from '../genre/genre.service';
import { Genre } from '../genre/models/genre';
import { Track } from '../track/models/track';
import { TrackService } from '../track/track.service';
import { CreateInputAlbum } from './inputs/create-inputmodule';
import { DeleteAlbumInput } from './inputs/delete-albuminout';
import { UpdateInputAlbum } from './inputs/update-albuminput';
import { Album } from './models/album';

@Injectable()
export class AlbumService {
  constructor(
    private readonly httpServise: HttpService,
    private readonly artServ: ArtistService,
    private readonly bandServise: BandService,
    @Inject(forwardRef(() => TrackService))
    private trackService: TrackService,
    private readonly genreServise: GenreService,
  ) {}

  async getAlbum(id) {
    const data = await this.httpServise.axiosRef.get(
      'http://localhost:3005/v1/albums/' + id.id,
    );
    const props = await this.getByids(data.data);

    return { ...data.data, ...props };
  }

  async getAlbums(): Promise<Album[]> {
    const data = await this.httpServise.axiosRef.get(
      'http://localhost:3005/v1/albums/',
    );
    const ans = await Promise.all(
      data.data.items.map(async (item) => {
        const props = await this.getByids(item);

        return {
          ...item,
          ...props,
        };
      }),
    );

    return ans;
  }

  async createAlbun(album: CreateInputAlbum): Promise<Album> {
    const albumRen = await this.renameField(album);

    const data = await this.httpServise.axiosRef.post(
      'http://localhost:3005/v1/albums/',
      albumRen,
      {
        headers: {
          Authorization: `Token ${process.env.token}`,
        },
      },
    );

    return this.getAlbum({ id: data.data._id });
  }

  async updateAlbum(album: UpdateInputAlbum) {
    const albumRen = await this.renameField(album);

    const data = await this.httpServise.axiosRef.put(
      'http://localhost:3005/v1/albums/' + album.id,
      albumRen,
      {
        headers: {
          Authorization: `Token ${process.env.token}`,
        },
      },
    );

    return this.getAlbum({ id: data.data._id });
  }

  async deleteAlbum(id: DeleteAlbumInput): Promise<DeleteAlbumInput> {
    const data = await this.httpServise.axiosRef.delete(
      'http://localhost:3005/v1/albums/' + id.id,
      {
        headers: {
          Authorization: `Token ${process.env.token}`,
        },
      },
    );
    return id;
  }

  async getByids(data) {
    let artists: Artist[];
    let bands: Band[];
    let genres: Genre[];
    let tracks: Track[];
    if (data.artistsIds && data.artistsIds !== null) {
      artists = await Promise.all(
        data.artistsIds.map(
          async (i) =>
            (await this.artServ.getArtist({ id: i })) || { id: 'not found' },
        ),
      );
    }
    if (data.bandsIds && data.bandsIds !== null) {
      bands = await Promise.all(
        data.bandsIds.map(
          async (i) =>
            (await this.bandServise.getBand({ id: i })) || {
              id: 'not found',
            },
        ),
      );
    }
    if (data.genresIds && data.genresIds !== null) {
      genres = await Promise.all(
        data.genresIds.map(
          async (i) =>
            (await this.genreServise.getGenre({ id: i })) || {
              id: 'not found',
            },
        ),
      );
    }
    if (data.trackIds && data.trackIds !== null) {
      tracks = await Promise.all(
        data.trackIds.map(
          async (i) =>
            (await this.trackService.getTrack({ id: i })) || {
              id: 'not found',
            },
        ),
      );
    }
    data.id = data._id;
    delete data['_id'];
    delete data['artistsIds'];
    delete data['bandsIds'];
    delete data['genresIds'];
    delete data['trackIds'];
    return { genres, bands, artists, tracks };
  }
  async renameField(Obj) {
    Obj['genresIds'] = Obj.genres || [];
    Obj['bandsIds'] = Obj.bands || [];
    Obj['trackIds'] = Obj.tracks || [];
    Obj['artistsIds'] = Obj.artists || [];

    delete Obj['genres'];
    delete Obj['bands'];
    delete Obj['artists'];
    delete Obj['tracks'];

    return Obj;
  }
}
