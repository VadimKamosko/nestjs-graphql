import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { ArtistService } from './artist.service';
import { GetArtistArgs } from './DTO/get-artist.args';
import { GetArtistsArgs } from './DTO/get-artists.args';
import { CreateArtistInput } from './imput/create-artist.input';
import { DeleteArtistInput } from './imput/delete-artistinput';
import { UpdateArtistinput } from './imput/update-artistinput';
import { Artist } from './models/artist';

@Resolver()
export class ArtistResolver {
  constructor(private readonly artistServise: ArtistService) {}

  @Query(() => Artist, { name: 'artist', nullable: true })
  getArtist(@Args() artistid: GetArtistArgs): Artist {
    return this.artistServise.getArtist(artistid);
  }

  @Query(() => [Artist], { name: 'artists', nullable: 'items' })
  getArtists(@Args()artistsid: GetArtistsArgs): Artist[] {
    return this.artistServise.getArtists(artistsid);
  }

  @Mutation(()=>Artist)
  createArtist(@Args(('createArtist'))createArtistdate:CreateArtistInput):Artist{
    return this.artistServise.createArtist(createArtistdate)
  }

  @Mutation(()=>Artist)
  updateArtist(@Args(('updateArtist'))update:UpdateArtistinput):Artist{
    return this.artistServise.updateArtist(update)
  }

  @Mutation(()=>Artist)
  removeArtist(@Args(('deleteArtist'))deleteId:DeleteArtistInput):Artist{
    return this.artistServise.deleteArist(deleteId)
  }
}
