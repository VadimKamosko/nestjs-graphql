import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumResolver } from './album.resolver';
import { HttpModule } from '@nestjs/axios';
import { ArtistService } from '../artist/artist.service';
import { BandService } from '../band/band.service';
import { GenreService } from '../genre/genre.service';
import { TrackService } from '../track/track.service';
import { ReferenceService } from 'src/reference/reference.service';

@Module({
  imports: [HttpModule],
  providers: [
    AlbumService,
    AlbumResolver,
    ReferenceService,
  ],
  exports: [AlbumService],
})
export class AlbumModule {}
