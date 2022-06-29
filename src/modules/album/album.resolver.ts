import { Resolver, Query, Args } from '@nestjs/graphql';
import { AlbumService } from './album.service';
import { GetAlbumArgs } from './DTO/get-albumargs';
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
}
