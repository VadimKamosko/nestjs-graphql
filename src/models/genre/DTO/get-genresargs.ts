import { ArgsType, Field } from '@nestjs/graphql';
import { IsArray } from 'class-validator';

@ArgsType()
export class GetGenresArg {
  @Field(() => [String])
  @IsArray()
  _id: string[];
}
