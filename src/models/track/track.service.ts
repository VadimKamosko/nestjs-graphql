import { Injectable } from '@nestjs/common';
import { GetTrackArg } from './DTO/get-trackargs';
import { GetTracksArg } from './DTO/get-tracksargs';
import { CreateTrackInput } from './input/create-trackinput';
import { Track } from './models/track';
import { UpdateTrackInput } from './input/update-trackinput';
import { DeleteTrackInput } from './input/delete-trackinput';
import { HttpService } from '@nestjs/axios';
import { BandService } from '../band/band.service';
import { GenreService } from '../genre/genre.service';
import { Band } from '../band/models/band';
import { Genre } from '../genre/models/genre';

@Injectable()
export class TrackService {
  constructor(
    private readonly httpServise: HttpService,
    private readonly bandService: BandService,
    private readonly genreService: GenreService,
  ) {}
  private tracks: Track[] = [];

  async getTrack(id: GetTrackArg): Promise<Track> {
    const data = await this.httpServise.axiosRef.get(
      'http://localhost:3006/v1/tracks/' + id._id,
    );

    if (!data.data) return null;
    const genre = await Promise.all(
      data.data.genresIds.map(async (i) => {
        if (typeof i === 'string')
          return (
            (await this.genreService.getGenre({ _id: i })) || {
              _id: 'deleted',
            }
          );
        else return [];
      }),
    );

    const band = await Promise.all(
      data.data.bandsIds.map(async (i) => {
        if (typeof i === 'string')
          return (
            (await this.bandService.getBand({ _id: i })) || { _id: 'deleted' }
          );
        else return [];
      }),
    );

    data.data['genre'] = genre;
    data.data['bands'] = band;

    return data.data;
  }

  async getTracks(tracks: GetTracksArg): Promise<Track[]> {
    const data = await this.httpServise.axiosRef.get(
      'http://localhost:3006/v1/tracks',
    );

    const ansTrack = await Promise.all(
      data.data.items.map(async (i) => {
        const genre = await Promise.all(
          i.genresIds.map(async (i) => {
            if (typeof i === 'string')
              return (
                (await this.genreService.getGenre({ _id: i })) || {
                  _id: 'deleted',
                }
              );
            else return {};
          }),
        );

        const band = await Promise.all(
          i.bandsIds.map(async (i) => {
            if (typeof i === 'string')
              return (
                (await this.bandService.getBand({ _id: i })) || {
                  _id: 'deleted',
                }
              );
            else return {};
          }),
        );
        i['genre'] = genre;
        i['bands'] = band;
        return i;
      }),
    );

    return ansTrack;
  }

  async createTrack(bodyTrack: CreateTrackInput): Promise<Track> {
    if (bodyTrack.bands && bodyTrack.bands !== null) {
      const bandIds = await Promise.all(
        bodyTrack.bands.map(async (i) => {
          const band = await this.bandService.createBand(i);
          return band._id;
        }),
      );
      delete bodyTrack.bands;
      bodyTrack['bandsIds'] = bandIds;
    }
    if (bodyTrack.genre !== null) {
      const genreIds = await Promise.all(
        bodyTrack.genre.map(async (i) => {
          const genre = await this.genreService.createGenre(i);

          return genre._id;
        }),
      );
      delete bodyTrack.genre;
      bodyTrack['genresIds'] = genreIds;
    }

    const data = await this.httpServise.axiosRef.post(
      'http://localhost:3006/v1/tracks',
      bodyTrack,
      {
        headers: {
          Authorization: `Token ${process.env.token}`,
        },
      },
    );

    const genre = await Promise.all(
      data.data.genresIds.map(
        async (i) => await this.genreService.getGenre({ _id: i }),
      ),
    );

    const band = await Promise.all(
      data.data.bandsIds.map(
        async (i) => await this.bandService.getBand({ _id: i }),
      ),
    );
    data.data['genre'] = genre;
    data.data['bands'] = band;
    return data.data;
  }

  async updateTrack(bodyTrack: UpdateTrackInput):Promise<Track> {
    let updBand:Band[]
    let updGenre:Genre[]
    if (bodyTrack.bands && bodyTrack.bands !== null) {
       updBand = await Promise.all(
        bodyTrack.bands.map(async (i) => await this.bandService.updateBand(i)),
      );
      delete bodyTrack.bands;
    }
    if (bodyTrack.genre && bodyTrack.genre !== null) {
       updGenre = await Promise.all(
        bodyTrack.genre.map(
          async (i) => await this.genreService.updateGenre(i),
        ),
      );
      delete bodyTrack.genre;
    }
    const data = this.httpServise.axiosRef.put(
      'http://localhost:3006/v1/tracks/' + bodyTrack._id,
      bodyTrack,
      {
        headers: {
          Authorization: `Token ${process.env.token}`,
        },
      },
    );

    return {
      ...bodyTrack,
      genre: updGenre,
      bands: updBand,
    };
  }
  deleteTrack(bodyDelTracl: DeleteTrackInput): DeleteTrackInput {
    const data = this.httpServise.axiosRef.delete(
      'http://localhost:3006/v1/tracks/' + bodyDelTracl._id,
      {
        headers: {
          Authorization: `Token ${process.env.token}`,
        },
      },
    );
    return bodyDelTracl;
  }
}
