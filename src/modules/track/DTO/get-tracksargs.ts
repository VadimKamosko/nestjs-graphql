import { ArgsType, Field, Int } from '@nestjs/graphql';
import { SearchTrack } from '../input/search-track';

@ArgsType()
export class GetTracksArg {
  @Field(() => Int, { nullable: true, defaultValue: 0 })
  offset: number;
  @Field(() => Int, { nullable: true, defaultValue: 5 })
  limit: number;
  @Field(() => SearchTrack, { nullable: true, defaultValue: null })
  filter: SearchTrack;
}
