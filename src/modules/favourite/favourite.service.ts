import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Favourite } from './models/favourite';

@Injectable()
export class FavouriteService {
  constructor(private readonly httpService: HttpService) {}
  async getFavs(): Promise<Favourite> {
    const data = await this.httpService.axiosRef.get(
      'http://localhost:3007/v1/favourites',
      {
        headers: {
          Authorization: `Token ${process.env.token}`,
        },
      },
    );
    return this.changeObj(data.data)
  }
  async addTrackToFavourites(track): Promise<Favourite> {
    const data = await this.httpService.axiosRef.put(
      'http://localhost:3007/v1/favourites/add',
      { id: track.tracks, type: 'tracks' },
      {
        headers: {
          Authorization: `Token ${process.env.token}`,
        },
      },
    );

    return this.changeObj(data.data)
  }
  async addBandToFavourites(band): Promise<Favourite> {
    const data = await this.httpService.axiosRef.put(
      'http://localhost:3007/v1/favourites/add',
      { id: band.bands, type: 'bands' },
      {
        headers: {
          Authorization: `Token ${process.env.token}`,
        },
      },
    );

    return this.changeObj(data.data)
  }
  async addArtistToFavourites(artist): Promise<Favourite> {
    const data = await this.httpService.axiosRef.put(
      'http://localhost:3007/v1/favourites/add',
      { id: artist.artists, type: 'artists' },
      {
        headers: {
          Authorization: `Token ${process.env.token}`,
        },
      },
    );

    return this.changeObj(data.data)
  }

  async addGenreToFavourites(genre): Promise<Favourite> {
    const data = await this.httpService.axiosRef.put(
      'http://localhost:3007/v1/favourites/add',
      { id: genre.genres, type: 'genres' },
      {
        headers: {
          Authorization: `Token ${process.env.token}`,
        },
      },
    );

    return this.changeObj(data.data)
  }






  changeObj(obj) {
    return {
      _id: obj._id,
      bands: obj.bandsIds,
      artists: obj.artistsIds,
      genres: obj.genresIds,
      tracks: obj.tracksIds,
      userId: obj.userId,
    };
  }
}
