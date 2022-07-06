import { ArgsType, Field, Int } from '@nestjs/graphql';
import { CreateInputAlbum } from '../inputs/create-inputmodule';

@ArgsType()
export class GetAlbumsArgs {
  @Field(() => Int, { nullable: true, defaultValue: 0 })
  offset: number;
  @Field(() => Int, { nullable: true, defaultValue: 5 })
  limit: number;
  @Field(() => CreateInputAlbum, { nullable: true, defaultValue: null })
  filter: CreateInputAlbum;
}
