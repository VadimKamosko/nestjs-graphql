import { Query, Args, Resolver, Mutation } from '@nestjs/graphql';
import { GetTrackArg } from './DTO/get-trackargs';
import { GetTracksArg } from './DTO/get-tracksargs';
import { CreateTrackInput } from './input/create-trackinput';
import { DeleteTrackInput } from './input/delete-trackinput';
import { UpdateTrackInput } from './input/update-trackinput';
import { Track } from './models/track';
import { TrackService } from './track.service';

@Resolver()
export class TrackResolver {
  constructor(
    private readonly trackServise: TrackService,
  ) {}

  @Query(() => Track, { name: 'track', nullable: true })
  getTrack(@Args() trackid: GetTrackArg): Track {
    return this.trackServise.getTrack(trackid);
  }

  @Query(() => [Track], { name: 'tracks', nullable: 'items' })
  getTracks(@Args() trackids: GetTracksArg): Track[] {
    return this.trackServise.getTracks(trackids);
  }
  /*@Context("token")token:string*/
  @Mutation(() => Track)
  createTrack(@Args('createTrack') trackbody: CreateTrackInput): Track {
    return this.trackServise.createTrack(trackbody);
  }
  @Mutation(() => Track)
  updateTrack(@Args('updateTrack') trackbody: UpdateTrackInput): Track {
    return this.trackServise.updateTrack(trackbody);
  }
  @Mutation(() => Track)
  deleteTrack(@Args('deleteTrack') delTrackId: DeleteTrackInput): Track {
    return this.trackServise.deleteTrack(delTrackId);
  }
}
