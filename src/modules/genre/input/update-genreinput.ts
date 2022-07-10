import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateGenreInput {
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
