import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackResolver } from './track.resolver';
import { ArtistService } from '../artist/artist.service';


@Module({
  providers: [TrackService, TrackResolver,ArtistService]
})
export class TrackModule {}
