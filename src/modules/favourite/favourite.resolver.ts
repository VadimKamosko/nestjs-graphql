import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { FavouriteService } from './favourite.service';
import { CreateInputTracktofav } from './inputs/create-inputaddtrack';
import { CreateInputArtisttofav } from './inputs/create-inputartisttofav';

import { CreateInputGenretofav } from './inputs/create-inputgenretofav';
import { CreateInputBandtofav } from './inputs/crete-inputbandtofav';
import { Favourite } from './models/favourite';

@Resolver()
export class FavouriteResolver {
  constructor(private readonly favService: FavouriteService) {}
  @Query(() => Favourite, { name: 'fav', nullable: true })
  getfav(@Context() token: any): Promise<Favourite> {
    return this.favService.getFavs(token.token);
  }
  @Mutation(() => Favourite)
  addTrackToFavourites(
    @Args('addTrackToFavourites') track: CreateInputTracktofav,
    @Context() token: any,
  ): Promise<Favourite> {
    return this.favService.addTrackToFavourites(track, token.token);
  }
  @Mutation(() => Favourite)
  addBandToFavourites(
    @Args('addBandToFavourites') band: CreateInputBandtofav,
    @Context() token: any,
  ): Promise<Favourite> {
    return this.favService.addBandToFavourites(band, token.token);
  }

  @Mutation(() => Favourite)
  addArtistToFavourites(
    @Args('addArtistToFavourites') artist: CreateInputArtisttofav,
    @Context() token: any,
  ): Promise<Favourite> {
    return this.favService.addArtistToFavourites(artist, token.token);
  }

  @Mutation(() => Favourite)
  addGenreToFavourites(
    @Args('addGenreToFavourites') genre: CreateInputGenretofav,
    @Context() token: any,
  ): Promise<Favourite> {
    return this.favService.addGenreToFavourites(genre, token.token);
  }
}
