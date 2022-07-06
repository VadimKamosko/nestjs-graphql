import { HttpService } from '@nestjs/axios';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { stringify } from 'qs';
import { ReferenceService } from 'src/reference/reference.service';
import { Path } from 'src/urls/urls';
import { GetAlbumsArgs } from './DTO/get-albumsdto';
import { CreateInputAlbum } from './inputs/create-inputmodule';
import { DeleteAlbumInput } from './inputs/delete-albuminout';
import { UpdateInputAlbum } from './inputs/update-albuminput';
import { Album } from './models/album';

@Injectable()
export class AlbumService {
  constructor(
    private readonly httpServise: HttpService,
    @Inject(forwardRef(() => ReferenceService))
    private refSer: ReferenceService,
  ) {}

  async getAlbum(id) {
    const data = await this.httpServise.axiosRef.get(Path.album + id.id);
    const props = await this.refSer.getByids(data.data);

    return { ...props };
  }

  async getAlbums(albums: GetAlbumsArgs): Promise<Album[]> {
    const data = await this.httpServise.axiosRef.get(
      `${Path.album}?limit=${albums.limit}&offset=${albums.offset}&${stringify(
        albums.filter,
      )}`,
    );
    const ans = await Promise.all(
      data.data.items.map(async (item) => {
        const props = await this.refSer.getByids(item);

        return {
          ...props,
        };
      }),
    );

    return ans;
  }

  async createAlbun(album: CreateInputAlbum, token: string): Promise<Album> {
    const albumRen = await this.refSer.renameField(album);

    const data = await this.httpServise.axiosRef.post(Path.album, albumRen, {
      headers: {
        Authorization: `${token}`,
      },
    });

    return this.getAlbum({ id: data.data._id });
  }

  async updateAlbum(album: UpdateInputAlbum, token: string) {
    const albumRen = await this.refSer.renameField(album);

    const data = await this.httpServise.axiosRef.put(
      Path.album + album.id,
      albumRen,
      {
        headers: {
          Authorization: `${token}`,
        },
      },
    );

    return this.getAlbum({ id: data.data._id });
  }

  async deleteAlbum(
    id: DeleteAlbumInput,
    token: string,
  ): Promise<DeleteAlbumInput> {
    const data = await this.httpServise.axiosRef.delete(Path.album + id.id, {
      headers: {
        Authorization: `${token}`,
      },
    });
    return id;
  }
}
