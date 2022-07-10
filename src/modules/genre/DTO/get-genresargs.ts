import { ArgsType, Field, Int } from '@nestjs/graphql';
import { CreateGenreInput } from '../input/create-genre.input';

@ArgsType()
export class GetGenresArg {
  @Field(() => Int, { nullable: true, defaultValue: 0 })
  offset: number;
  @Field(() => Int, { nullable: true, defaultValue: 5 })
  limit: number;
  @Field(() => CreateGenreInput, { nullable: true, defaultValue: null })
  filter: CreateGenreInput;
}
