import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { GetTrackArg } from './DTO/get-trackargs';
import { GetTracksArg } from './DTO/get-tracksargs';
import { CreateTrackInput } from './input/create-trackinput';
import { Track } from './models/track';
import { UpdateTrackInput } from './input/update-trackinput';
import { DeleteTrackInput } from './input/delete-trackinput';
import { HttpService } from '@nestjs/axios';
import { Path } from 'src/urls/urls';
import { ReferenceService } from 'src/reference/reference.service';
import { stringify } from 'qs';

@Injectable()
export class TrackService {
  constructor(
    private readonly httpServise: HttpService,
    @Inject(forwardRef(() => ReferenceService))
    private refSer: ReferenceService,
  ) {}

  async getTrack(id: GetTrackArg, albumId?: string): Promise<Track> {
    const data = await this.httpServise.axiosRef.get(Path.track + id.id);
    if (data.data.albumId == albumId) {
      data.data.albums = { id: albumId };
      delete data.data.albumId;
    }
    if (!data.data) return null;
    const props = await this.refSer.getByids(data.data);

    return { ...data.data, ...props };
  }

  async getTracks(tracks: GetTracksArg): Promise<Track[]> {
    const data = await this.httpServise.axiosRef.get(
      `${Path.track}?limit=${tracks.limit}&offset=${tracks.offset}&${stringify(
        tracks.filter,
      )}`,
    );

    const ans = await Promise.all(
      data.data.items.map(async (item) => {
        const props = await this.refSer.getByids(item);

        return {
          ...item,
          ...props,
        };
      }),
    );

    return ans;
  }

  async createTrack(
    bodyTrack: CreateTrackInput,
    token: string,
  ): Promise<Track> {
    const trackRen = await this.refSer.renameField(bodyTrack);

    const data = await this.httpServise.axiosRef.post(Path.track, trackRen, {
      headers: {
        Authorization: `${token}`,
      },
    });

    return this.getTrack({ id: data.data._id });
  }

  async updateTrack(
    bodyTrack: UpdateTrackInput,
    token: string,
  ): Promise<Track> {
    const trackRen = await this.refSer.renameField(bodyTrack);

    const data = await this.httpServise.axiosRef.put(
      Path.track + bodyTrack.id,
      trackRen,
      {
        headers: {
          Authorization: `${token}`,
        },
      },
    );

    return this.getTrack({ id: bodyTrack.id });
  }
  deleteTrack(bodyDelTracl: DeleteTrackInput, token: string): DeleteTrackInput {
    const data = this.httpServise.axiosRef.delete(
      Path.track + bodyDelTracl.id,
      {
        headers: {
          Authorization: `${token}`,
        },
      },
    );
    return bodyDelTracl;
  }
}
