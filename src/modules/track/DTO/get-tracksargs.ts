import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsArray } from 'class-validator';

@ArgsType()
export class GetTracksArg {
  @Field(() => Int, { nullable: true, defaultValue: 0 })
  offset: number;
  @Field(() => Int, { nullable: true, defaultValue: 5 })
  limit: number;
}
