import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackResolver } from './track.resolver';
import { HttpModule } from '@nestjs/axios';
import { ReferenceService } from 'src/reference/reference.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5,
      }),
    }),
  ],
  providers: [TrackService, TrackResolver, ReferenceService],
})
export class TrackModule {}
