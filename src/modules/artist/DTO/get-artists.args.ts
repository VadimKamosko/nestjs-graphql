import { ArgsType, Field, Int } from '@nestjs/graphql';
import { SearchInput } from '../input/search-artist';

@ArgsType()
export class GetArtistsArgs {
  @Field(() => Int, { nullable: true, defaultValue: 0 })
  offset: number;
  @Field(() => Int, { nullable: true, defaultValue: 5 })
  limit: number;
  @Field(() => SearchInput, { nullable: true, defaultValue: null })
  filter: SearchInput;
}
