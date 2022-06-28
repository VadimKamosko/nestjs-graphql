import { Module } from '@nestjs/common';
import { FavouriteService } from './favourite.service';
import { FavouriteResolver } from './favourite.resolver';

@Module({
  providers: [FavouriteService, FavouriteResolver]
})
export class FavouriteModule {}
