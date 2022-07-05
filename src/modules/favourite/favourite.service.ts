import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Path } from 'src/urls/urls';
import { Favourite } from './models/favourite';

@Injectable()
export class FavouriteService {
  constructor(private readonly httpService: HttpService) {}
  async getFavs(): Promise<Favourite> {
    const data = await this.httpService.axiosRef.get(Path.fav, {
      headers: {
        Authorization: `Token ${process.env.token}`,
      },
    });
    return this.changeObj(data.data);
  }
  async addTrackToFavourites(track): Promise<Favourite> {
    const data = await this.httpService.axiosRef.put(
      Path.fav,
      { id: track.tracks, type: 'tracks' },
      {
        headers: {
          Authorization: `Token ${process.env.token}`,
        },
      },
    );

    return this.changeObj(data.data);
  }
  async addBandToFavourites(band): Promise<Favourite> {
    const data = await this.httpService.axiosRef.put(
      Path.fav,
      { id: band.bands, type: 'bands' },
      {
        headers: {
          Authorization: `Token ${process.env.token}`,
        },
      },
    );

    return this.changeObj(data.data);
  }
  async addArtistToFavourites(artist): Promise<Favourite> {
    const data = await this.httpService.axiosRef.put(
      Path.fav,
      { id: artist.artists, type: 'artists' },
      {
        headers: {
          Authorization: `Token ${process.env.token}`,
        },
      },
    );

    return this.changeObj(data.data);
  }

  async addGenreToFavourites(genre): Promise<Favourite> {
    const data = await this.httpService.axiosRef.put(
      Path.fav,
      { id: genre.genres, type: 'genres' },
      {
        headers: {
          Authorization: `Token ${process.env.token}`,
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
