import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GetGenreArg } from './DTO/get-genre.args';
import { GetGenresArg } from './DTO/get-genresargs';
import { GenreService } from './genre.service';
import { CreateGenreInput } from './input/create-genre.input';
import { DeleteGenreInput } from './input/delete-genreinput';
import { UpdateGenreInput } from './input/update-genreinput';
import { Genre } from './models/genre';
import { AxiosResponse } from 'axios';

@Resolver()
export class GenreResolver {
  constructor(private readonly genreServise: GenreService) {}

  @Query(() => Genre, { name: 'genre', nullable: true })
  getGenre(@Args() genreid: GetGenreArg): Promise<AxiosResponse<Genre>> {
    return this.genreServise.getGenre(genreid);
  }

  @Query(() => [Genre], { name: 'genres', nullable: 'items' })
  getGenres(@Args() genresid: GetGenresArg): Promise<AxiosResponse<Genre[]>> {
    return this.genreServise.getGenres(genresid);
  }

  @Mutation(() => Genre)
  createGenre(
    @Args('createGenre') createGenredate: CreateGenreInput,
    @Context() token: any,
  ): Promise<Genre> {
    return this.genreServise.createGenre(createGenredate, token.token);
  }

  @Mutation(() => Genre)
  updateGenre(
    @Args('updateGenre') update: UpdateGenreInput,
    @Context() token: any,
  ): Promise<Genre> {
    return this.genreServise.updateGenre(update, token.token);
  }

  @Mutation(() => Genre)
  removeGenre(
    @Args('deleteGenre') deleteId: DeleteGenreInput,
    @Context() token: any,
  ): Promise<DeleteGenreInput> {
    return this.genreServise.deleteGenre(deleteId, token.token);
  }
}
