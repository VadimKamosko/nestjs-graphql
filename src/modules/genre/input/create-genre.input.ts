import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateGenreInput {
  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  country: string;

  @Field(() => Int, { nullable: true })
  year: number;
}
