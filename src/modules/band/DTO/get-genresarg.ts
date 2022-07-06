import { ArgsType, Field, Int } from '@nestjs/graphql';
import { CreateInputBand } from '../input/create-bandinput';

@ArgsType()
export class GetGenresArgs {
  @Field(() => Int, { nullable: true, defaultValue: 0 })
  offset: number;
  @Field(() => Int, { nullable: true, defaultValue: 5 })
  limit: number;
  @Field(() => CreateInputBand, { nullable: true, defaultValue: null })
  filter: CreateInputBand;
}
