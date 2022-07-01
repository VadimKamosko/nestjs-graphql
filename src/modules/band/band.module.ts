import { Module } from '@nestjs/common';
import { BandService } from './band.service';
import { BandResolver } from './band.resolver';
import { HttpModule } from '@nestjs/axios';
import { GenreService } from '../genre/genre.service';

@Module({
  imports: [HttpModule],
  providers: [BandService, BandResolver, GenreService],
})
export class BandModule {}
