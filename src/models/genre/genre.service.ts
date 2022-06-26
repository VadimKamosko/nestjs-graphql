import { Injectable } from '@nestjs/common';
import { Genre } from './models/genre';
import { v4 as uuidv4 } from 'uuid';
import { CreateGenreInput } from './input/create-genre.input';
import { UpdateGenreInput } from './input/update-genreinput';
import { GetGenreArg } from './DTO/get-genre.args';
import { GetGenresArg } from './DTO/get-genresargs';
import { DeleteGenreInput } from './input/delete-genreinput';


@Injectable()
export class GenreService {
    private genres: Genre[] = [];

  public createGenre(createArtist: CreateGenreInput): Genre {
    const genre: Genre = {
      _id: uuidv4(),
      ...createArtist,
    };
    this.genres.push(genre);
    return genre;
  }
  public updateGenre(updateGenre: UpdateGenreInput): Genre {
    const genre = this.genres.find((i) => i._id === updateGenre._id);
    Object.assign(genre, updateGenre);
    return genre;
  }
  public getGenre(getGenretArg: GetGenreArg): Genre {
    return this.genres.find((i) => i._id === getGenretArg._id);
  }
  public getGenres(getGenretArg: GetGenresArg): Genre[] {
    return getGenretArg._id.map((i) => this.getGenre({ _id: i }));
  }
  public deleteGenre(getGenretArg: DeleteGenreInput): Genre {
    const id = this.genres.findIndex((i) => i._id === getGenretArg._id);
    const genre = this.genres[id];
    this.genres.splice(id, 1);
    return genre;
  }
}
