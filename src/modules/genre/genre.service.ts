import { ForbiddenException, Injectable } from '@nestjs/common';
import { Genre } from './models/genre';
import { CreateGenreInput } from './input/create-genre.input';
import { UpdateGenreInput } from './input/update-genreinput';
import { GetGenreArg } from './DTO/get-genre.args';
import { GetGenresArg } from './DTO/get-genresargs';
import { DeleteGenreInput } from './input/delete-genreinput';
import { AxiosResponse } from 'axios';
import { HttpService } from '@nestjs/axios';
import { Path } from 'src/urls/urls';
import { Context } from '@nestjs/graphql';

@Injectable()
export class GenreService {
  constructor(private readonly httpService: HttpService) {}
  private genres: Genre[] = [];

  public async createGenre(
    createGenre: CreateGenreInput,
    token: string,
  ): Promise<Genre> {
    if (!token) throw new ForbiddenException();
    const data = await this.httpService.axiosRef.post(Path.genre, createGenre, {
      headers: {
        Authorization: `${token}`,
      },
    });

    return this.replaceId(data.data);
  }

  public async updateGenre(
    updateGenre: UpdateGenreInput,
    token: string,
  ): Promise<Genre> {
     if (!token) throw new ForbiddenException();
    
    const data = await this.httpService.axiosRef.put(
      Path.genre + updateGenre.id,
      updateGenre,
      {
        headers: {
          Authorization: `${token}`,
        },
      },
    );

    return this.replaceId(data.data);
  }
  public async getGenre(
    getGenretArg: GetGenreArg,
  ): Promise<AxiosResponse<Genre>> {
    const data = await this.httpService.axiosRef.get(
      Path.genre + getGenretArg.id,
    );

    return this.replaceId(data.data);
  }
  public async getGenres(
    getGenretArg: GetGenresArg,
  ): Promise<AxiosResponse<Genre[]>> {
    const offset = getGenretArg.offset || 0;
    const limit = getGenretArg.limit || 5;
    const data = await this.httpService.axiosRef.get(
      `${Path.genre}?limit=${limit}&offset=${offset}`,
    );

    return data.data.items.map((item) => {
      this.replaceId(item);

      return item;
    });
  }
  public async deleteGenre(
    getGenretArg: DeleteGenreInput,
    token: string,
  ): Promise<DeleteGenreInput> {
    if (!token) throw new ForbiddenException();
    const data = await this.httpService.axiosRef.delete(
      Path.genre + getGenretArg.id,
      {
        headers: {
          Authorization: `${token}`,
        },
      },
    );

    return getGenretArg;
  }

  replaceId(data) {
    if (!data._id) return data;
    data.id = data._id;
    delete data._id;
    return data;
  }
}
