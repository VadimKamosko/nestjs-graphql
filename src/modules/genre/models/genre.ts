import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@ObjectType()
export class Genre {
  @Field()
  @IsNotEmpty()
  id: string;
  @Field({ nullable: true })
  name: string;
  @Field({ nullable: true })
  description: string;
  @Field({ nullable: true })
  country: string;
  @Field(() => Int, { nullable: true })
  year: number;
}
