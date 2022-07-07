import { Module } from '@nestjs/common';
import { FavouriteService } from './favourite.service';
import { FavouriteResolver } from './favourite.resolver';
import { HttpModule } from '@nestjs/axios';
import { ReferenceService } from 'src/reference/reference.service';

@Module({
  imports: [HttpModule],
  providers: [FavouriteService, FavouriteResolver, ReferenceService],
})
export class FavouriteModule {}
