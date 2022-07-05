import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class GetAlbumsArgs {
  @Field(() => Int, { nullable: true, defaultValue: 0 })
  offset: number;
  @Field(() => Int, { nullable: true, defaultValue: 5 })
  limit: number;
}