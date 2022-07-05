import { forwardRef, Inject } from '@nestjs/common';
import {
  Query,
  Args,
  Resolver,
  Mutation,
  ResolveField,
  Parent,
  Context,
} from '@nestjs/graphql';
import { AlbumService } from '../album/album.service';
import { Album } from '../album/models/album';
import { GetTrackArg } from './DTO/get-trackargs';
import { GetTracksArg } from './DTO/get-tracksargs';
import { CreateTrackInput } from './input/create-trackinput';
import { DeleteTrackInput } from './input/delete-trackinput';
import { UpdateTrackInput } from './input/update-trackinput';
import { Track } from './models/track';
import { TrackService } from './track.service';

@Resolver((of) => Track)
export class TrackResolver {
  constructor(
    private readonly trackServise: TrackService,
  ) // @Inject(forwardRef(() => AlbumService))
  // private albService: AlbumService,
  {}

  @Query(() => Track, { name: 'track', nullable: true })
  getTrack(@Args() trackid: GetTrackArg): Promise<Track> {
    return this.trackServise.getTrack(trackid);
  }

  @Query(() => [Track], { name: 'tracks', nullable: 'items' })
  getTracks(@Args() trackids: GetTracksArg): Promise<Track[]> {
    return this.trackServise.getTracks(trackids);
  }

  @Mutation(() => Track)
  createTrack(
    @Args('createTrack') trackbody: CreateTrackInput,
    @Context() token: any,
  ): Promise<Track> {
    return this.trackServise.createTrack(trackbody, token.token);
  }
  @Mutation(() => Track)
  updateTrack(
    @Args('updateTrack') trackbody: UpdateTrackInput,
    @Context() token: any,
  ): Promise<Track> {
    return this.trackServise.updateTrack(trackbody, token.token);
  }
  @Mutation(() => Track)
  deleteTrack(
    @Args('deleteTrack') delTrackId: DeleteTrackInput,
    @Context() token: any,
  ): DeleteTrackInput {
    return this.trackServise.deleteTrack(delTrackId, token.token);
  }

  // @ResolveField(() => Album)
  // async getArtist(@Parent() track: Track) {
  //   return this.albService.getAlbum({ id: track.albums });
  // }
}
