import { forwardRef, Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackResolver } from './track.resolver';
import { ArtistService } from '../artist/artist.service';
import { HttpModule } from '@nestjs/axios';
import { BandService } from '../band/band.service';
import { GenreService } from '../genre/genre.service';
import { AlbumService } from '../album/album.service';
import { AlbumModule } from '../album/album.module';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5,
      }),
    }),
    forwardRef(()=>AlbumModule)
  ],
  providers: [
    TrackService,
    TrackResolver,
    ArtistService,
    BandService,
    GenreService,
  ],
})
export class TrackModule {}
