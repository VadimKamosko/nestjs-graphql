import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
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
    constructor(private readonly genreServise:GenreService){}

    @Query(() => Genre, { name: 'genre', nullable: true })
    getGenre(@Args() genreid: GetGenreArg): Promise<AxiosResponse<Genre>> {
      return this.genreServise.getGenre(genreid);
    }
  
    @Query(() => [Genre], { name: 'genres', nullable: 'items' })
    getGenres(@Args()genresid: GetGenresArg): Promise<AxiosResponse<Genre[]>> {
      return this.genreServise.getGenres(genresid);
    }
  
    @Mutation(()=>Genre)
    createGenre(@Args(('createGenre'))createGenredate:CreateGenreInput):Promise<AxiosResponse<Genre>>{
      return this.genreServise.createGenre(createGenredate)
    }
  
    @Mutation(()=>Genre)
    updateGenre(@Args(('updateGenre'))update:UpdateGenreInput):Promise<AxiosResponse<Genre>>{
      return this.genreServise.updateGenre(update)
    }
  
    @Mutation(()=>Genre)
    removeGenre(@Args(('deleteGenre'))deleteId:DeleteGenreInput):Promise<DeleteGenreInput>{
      return this.genreServise.deleteGenre(deleteId)
    }
}
