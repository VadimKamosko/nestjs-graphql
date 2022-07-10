import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateTrackInput {
  @Field()
  title: string;

  @Field({ nullable: true })
  albums: string;

  @Field(() => [String], { nullable: true })
  bands: string[];

  @Field(() => [String], { nullable: true })
  artists: string[];

  @Field(() => Int, { nullable: true })
  duration: number;

  @Field(() => Int, { nullable: true })
  released: number;

  @Field(() => [String], { nullable: true })
  genres: string[];
}
