import { Module } from '@nestjs/common';
import { ArtistResolver } from './artist.resolver';
import { ArtistService } from './artist.service';

@Module({
  providers: [ArtistResolver, ArtistService]
})
export class ArtistModule {}
