import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { GenreResolver } from './genre.resolver';
import { GenreService } from './genre.service';

@Module({
  imports: [HttpModule],
  providers: [GenreResolver, GenreService],
})
export class GenreModule {}
