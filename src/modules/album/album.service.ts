import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ArtistService } from '../artist/artist.service';
import { Artist } from '../artist/models/artist';
import { BandService } from '../band/band.service';
import { Band } from '../band/models/band';
import { GenreService } from '../genre/genre.service';
import { Genre } from '../genre/models/genre';
import { Track } from '../track/models/track';
import { TrackService } from '../track/track.service';
import { Album } from './models/album';

@Injectable()
export class AlbumService {
  constructor(
    private readonly httpServise: HttpService,
    private readonly artServ: ArtistService,
    private readonly bandServise: BandService,
    private readonly trackServise: TrackService,
    private readonly genreServise: GenreService,
  ) {}

  async getAlbum(id) {
    const data = await this.httpServise.axiosRef.get(
      'http://localhost:3005/v1/albums/' + id._id,
    );
    const props = await this.getByids(data.data);

    delete data.data['artistsIds'];
    delete data.data['bandsIds'];
    delete data.data['genresIds'];
    delete data.data['trackIds'];

    return { ...data.data, ...props };
  }

  async getAlbums(): Promise<Album[]> {
    const data = await this.httpServise.axiosRef.get(
      'http://localhost:3005/v1/albums/',
    );
    const ans = await Promise.all(
      data.data.items.map(async (item) => {
        const props = await this.getByids(item);
        delete item['artistsIds'];
        delete item['bandsIds'];
        delete item['genresIds'];
        delete item['trackIds'];

        return {
          ...item,
          ...props,
        };
      }),
    );
    return ans;
  }

  async getByids(data) {
    let artists: Artist[];
    let bands: Band[];
    let genres: Genre[];
    let tracks: Track[];
    if (data.artistsIds && data.artistsIds !== null) {
      artists = await Promise.all(
        data.artistsIds.map(
          async (i) => await this.artServ.getArtist({ _id: i }),
        ),
      );
    }
    if (data.bandsIds && data.bandsIds !== null) {
      bands = await Promise.all(
        data.bandsIds.map(
          async (i) => await this.bandServise.getBand({ _id: i }),
        ),
      );
    }
    if (data.genresIds && data.genresIds !== null) {
      genres = await Promise.all(
        data.genresIds.map(
          async (i) => await this.genreServise.getGenre({ _id: i }),
        ),
      );
    }
    if (data.trackIds && data.trackIds !== null) {
      tracks = await Promise.all(
        data.trackIds.map(
          async (i) => await this.trackServise.getTrack({ _id: i }),
        ),
      );
    }
    return { genres, bands, artists, tracks };
  }
}
