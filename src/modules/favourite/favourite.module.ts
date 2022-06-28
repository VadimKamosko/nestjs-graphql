import { Module } from '@nestjs/common';
import { FavouriteService } from './favourite.service';
import { FavouriteResolver } from './favourite.resolver';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports:[HttpModule],
  providers: [FavouriteService, FavouriteResolver]
})
export class FavouriteModule {}
