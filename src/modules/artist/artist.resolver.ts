import { Resolver, Query, Args, Mutation, Context } from '@nestjs/graphql';
import { ArtistService } from './artist.service';
import { GetArtistArgs } from './DTO/get-artist.args';
import { GetArtistsArgs } from './DTO/get-artists.args';
import { CreateArtistInput } from './input/create-artist.input';
import { DeleteArtistInput } from './input/delete-artistinput';
import { UpdateArtistinput } from './input/update-artistinput';
import { Artist } from './models/artist';

@Resolver()
export class ArtistResolver {
  constructor(private readonly artistServise: ArtistService) {}

  @Query(() => Artist, { name: 'artist', nullable: true })
  getArtist(@Args() artistid: GetArtistArgs): Promise<Artist> {
    return this.artistServise.getArtist(artistid);
  }

  @Query(() => [Artist], { name: 'artists', nullable: 'items' })
  getArtists(@Args() artistsid: GetArtistsArgs): Promise<Artist[]> {
    return this.artistServise.getArtists(artistsid);
  }

  @Mutation(() => Artist)
  createArtist(
    @Args('createArtist') createArtistdate: CreateArtistInput,
    @Context() token: any,
  ): Promise<Artist> {
    return this.artistServise.createArtist(createArtistdate, token.token);
  }

  @Mutation(() => Artist)
  updateArtist(
    @Args('updateArtist') update: UpdateArtistinput,
    @Context() token: any,
  ): Promise<Artist> {
    return this.artistServise.updateArtist(update, token.token);
  }

  @Mutation(() => Artist)
  removeArtist(
    @Args('deleteArtist') deleteId: DeleteArtistInput,
    @Context() token: any,
  ): Promise<DeleteArtistInput> {
    return this.artistServise.deleteArist(deleteId, token.token);
  }
}
