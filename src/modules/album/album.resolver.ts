import { Resolver, Query, Args, Mutation, Context } from '@nestjs/graphql';
import { AlbumService } from './album.service';
import { GetAlbumArgs } from './DTO/get-albumargs';
import { GetAlbumsArgs } from './DTO/get-albumsdto';
import { CreateInputAlbum } from './inputs/create-inputmodule';
import { DeleteAlbumInput } from './inputs/delete-albuminout';
import { UpdateInputAlbum } from './inputs/update-albuminput';
import { Album } from './models/album';

@Resolver()
export class AlbumResolver {
  constructor(private readonly albServise: AlbumService) {}

  @Query(() => Album, { name: 'album', nullable: true })
  getAlbum(@Args() album: GetAlbumArgs): Promise<Album> {
    return this.albServise.getAlbum(album);
  }

  @Query(() => [Album], { name: 'albums', nullable: 'items' })
  getAlbums(@Args() albums: GetAlbumsArgs): Promise<Album[]> {
    return this.albServise.getAlbums(albums);
  }

  @Mutation(() => Album)
  createAlbum(
    @Args('CreateAlbum') album: CreateInputAlbum,
    @Context() token: any,
  ): Promise<Album> {
    return this.albServise.createAlbun(album, token.token);
  }

  @Mutation(() => Album)
  updateAlbum(
    @Args('updateAlbum') album: UpdateInputAlbum,
    @Context() token: any,
  ): Promise<Album> {
    return this.albServise.updateAlbum(album, token.token);
  }

  @Mutation(() => Album)
  deleteAlbum(
    @Args('deleteAlbum') id: DeleteAlbumInput,
    @Context() token: any,
  ): Promise<DeleteAlbumInput> {
    return this.albServise.deleteAlbum(id, token.token);
  }
}
