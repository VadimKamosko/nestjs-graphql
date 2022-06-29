import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { FavouriteService } from './favourite.service';
import { CreateInputTracktofav } from './imputs/create-inputaddtrack';
import { CreateInputArtisttofav } from './imputs/create-inputartisttofav';

import { CreateInputGenretofav } from './imputs/create-inputgenretofav';
import { CreateInputBandtofav } from './imputs/crete-inputbandtofav';
import { Favourite } from './models/favourite';

@Resolver()
export class FavouriteResolver {
  constructor(private readonly favService: FavouriteService) {}
  @Query(() => Favourite, { name: 'fav', nullable: true })
  getfav(): Promise<Favourite> {
    return this.favService.getFavs();
  }
  @Mutation(() => Favourite)
  addTrackToFavourites(
    @Args('addTrackToFavourites') track: CreateInputTracktofav,
  ): Promise<Favourite> {
    return this.favService.addTrackToFavourites(track);
  }
  @Mutation(() => Favourite)
  addBandToFavourites(
    @Args('addBandToFavourites') band: CreateInputBandtofav,
  ): Promise<Favourite> {
    return this.favService.addBandToFavourites(band);
  }

  @Mutation(() => Favourite)
  addArtistToFavourites(
    @Args('addArtistToFavourites') artist: CreateInputArtisttofav,
  ): Promise<Favourite> {
    return this.favService.addArtistToFavourites(artist);
  }

  @Mutation(() => Favourite)
  addGenreToFavourites(
    @Args('addGenreToFavourites') genre: CreateInputGenretofav,
  ): Promise<Favourite> {
    return this.favService.addGenreToFavourites(genre);
  }


}