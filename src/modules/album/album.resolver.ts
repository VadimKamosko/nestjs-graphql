import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { AlbumService } from './album.service';
import { GetAlbumArgs } from './DTO/get-albumargs';
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
  getAlbums(): Promise<Album[]> {
    return this.albServise.getAlbums();
  }

  @Mutation(() => Album)
  createAlbum(@Args('CreateAlbum') album: CreateInputAlbum): Promise<Album> {
    return this.albServise.createAlbun(album);
  }

  @Mutation(() => Album)
  updateAlbum(@Args('updateAlbum') album: UpdateInputAlbum): Promise<Album> {
    return this.albServise.updateAlbum(album);
  }

  @Mutation(() => Album)
  deleteAlbum(
    @Args('deleteAlbum') id: DeleteAlbumInput,
  ): Promise<DeleteAlbumInput> {
    return this.albServise.deleteAlbum(id);
  }
}
