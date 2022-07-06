import { ArgsType, Field, Int } from '@nestjs/graphql';
import { CreateArtistInput } from '../input/create-artist.input';

@ArgsType()
export class GetArtistsArgs {
  @Field(() => Int, { nullable: true, defaultValue: 0 })
  offset: number;
  @Field(() => Int, { nullable: true, defaultValue: 5 })
  limit: number;
  @Field(() => CreateArtistInput, { nullable: true, defaultValue: null })
  filter: CreateArtistInput;
}
