import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Path } from 'src/urls/urls';
import { Favourite } from './models/favourite';

@Injectable()
export class FavouriteService {
  constructor(private readonly httpService: HttpService) {}
  async getFavs(token: string): Promise<Favourite> {
    const data = await this.httpService.axiosRef.get(Path.fav, {
      headers: {
        Authorization: `${token}`,
      },
    });
    return this.changeObj(data.data);
  }
  async addTrackToFavourites(track, token: string): Promise<Favourite> {
    const data = await this.httpService.axiosRef.put(
      Path.fav + 'add',
      { id: track.tracks, type: 'tracks' },
      {
        headers: {
          Authorization: `${token}`,
        },
      },
    );

    return this.changeObj(data.data);
  }
  async addBandToFavourites(band, token: string): Promise<Favourite> {
    const data = await this.httpService.axiosRef.put(
      Path.fav + 'add',
      { id: band.bands, type: 'bands' },
      {
        headers: {
          Authorization: `${token}`,
        },
      },
    );

    return this.changeObj(data.data);
  }
  async addArtistToFavourites(artist, token: string): Promise<Favourite> {
    const data = await this.httpService.axiosRef.put(
      Path.fav + 'add',
      { id: artist.artists, type: 'artists' },
      {
        headers: {
          Authorization: `${token}`,
        },
      },
    );

    return this.changeObj(data.data);
  }

  async addGenreToFavourites(genre, token: string): Promise<Favourite> {
    const data = await this.httpService.axiosRef.put(
      Path.fav+'add',
      { id: genre.genres, type: 'genres' },
      {
        headers: {
          Authorization: `${token}`,
        },
      },
    );

    return this.changeObj(data.data);
  }

  changeObj(obj) {
    return {
      id: obj._id,
      bands: obj.bandsIds,
      artists: obj.artistsIds,
      genres: obj.genresIds,
      tracks: obj.tracksIds,
      userId: obj.userId,
    };
  }
}
