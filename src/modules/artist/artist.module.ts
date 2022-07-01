import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { BandService } from '../band/band.service';
import { GenreService } from '../genre/genre.service';
import { ArtistResolver } from './artist.resolver';
import { ArtistService } from './artist.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5,
      }),
    }),
  ],
  providers: [ArtistResolver, ArtistService, BandService, GenreService],
})
export class ArtistModule {}
