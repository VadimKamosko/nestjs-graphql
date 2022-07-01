import { ForbiddenException, Injectable } from '@nestjs/common';
import { Genre } from './models/genre';
import { CreateGenreInput } from './input/create-genre.input';
import { UpdateGenreInput } from './input/update-genreinput';
import { GetGenreArg } from './DTO/get-genre.args';
import { GetGenresArg } from './DTO/get-genresargs';
import { DeleteGenreInput } from './input/delete-genreinput';
import { AxiosResponse } from 'axios';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class GenreService {
  constructor(private readonly httpService: HttpService) {}
  private genres: Genre[] = [];

  public async createGenre(createGenre: CreateGenreInput): Promise<Genre> {
    if (!process.env.token) throw new ForbiddenException();
    const data = await this.httpService.axiosRef.post(
      'http://localhost:3001/v1/genres',
      createGenre,
      {
        headers: {
          Authorization: `Token ${process.env.token}`,
        },
      },
    );

    return this.replaceId(data.data);
  }

  public async updateGenre(updateGenre: UpdateGenreInput): Promise<Genre> {
    if (!process.env.token) throw new ForbiddenException();

    const data = await this.httpService.axiosRef.put(
      'http://localhost:3001/v1/genres/' + updateGenre.id,
      updateGenre,
      {
        headers: {
          Authorization: `Token ${process.env.token}`,
        },
      },
    );

    return this.replaceId(data.data);
  }
  public async getGenre(
    getGenretArg: GetGenreArg,
  ): Promise<AxiosResponse<Genre>> {
    const data = await this.httpService.axiosRef.get(
      'http://localhost:3001/v1/genres/' + getGenretArg.id,
    );

    return this.replaceId(data.data);
  }
  public async getGenres(
    getGenretArg: GetGenresArg,
  ): Promise<AxiosResponse<Genre[]>> {
    const data = await this.httpService.axiosRef.get(
      'http://localhost:3001/v1/genres',
    );

    return data.data.items.map((item) => {
      this.replaceId(item);

      return item;
    });
  }
  public async deleteGenre(
    getGenretArg: DeleteGenreInput,
  ): Promise<DeleteGenreInput> {
    if (!process.env.token) throw new ForbiddenException();
    const data = await this.httpService.axiosRef.delete(
      'http://localhost:3001/v1/genres/' + getGenretArg.id,
      {
        headers: {
          Authorization: `Token ${process.env.token}`,
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
