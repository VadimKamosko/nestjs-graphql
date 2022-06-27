import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateGenreInput {
  @Field()
  @IsNotEmpty()
  name: string;
  @Field()
  @IsNotEmpty()
  description: string;
  @Field()
  @IsNotEmpty()
  country: string;
  @Field()
  @IsNotEmpty()
  year: string;
  @Field(() => [CreateGenreInput], { nullable: true })
  subGenresIds: CreateGenreInput[];
}
