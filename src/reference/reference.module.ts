import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AlbumService } from 'src/modules/album/album.service';
import { ArtistService } from 'src/modules/artist/artist.service';
import { BandService } from 'src/modules/band/band.service';
import { GenreService } from 'src/modules/genre/genre.service';
import { TrackService } from 'src/modules/track/track.service';
import { ReferenceService } from './reference.service';


@Module({
  imports: [HttpModule],
  providers: [ReferenceService,
    AlbumService,
    ArtistService,
    BandService,
    GenreService,
    TrackService,]
})
export class ReferenceModule {}
