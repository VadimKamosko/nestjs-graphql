import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsArray } from 'class-validator';

@ArgsType()
export class GetGenresArg {
  @Field(()=>Int,{nullable:true})
  offset: number;
  @Field(()=>Int,{nullable:true})
  limit: number;
}
