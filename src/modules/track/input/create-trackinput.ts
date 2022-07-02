import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateTrackInput {
  @Field({ nullable: true })
  title: string;

  @Field({ nullable: true })
  albums: string;

  @Field(() => [String], { nullable: true })
  bands: string[];

  @Field(() => [String], { nullable: true })
  artists: string[];

  @Field(() => Int)
  duration: number;

  @Field(() => Int)
  released: number;

  @Field(() => [String],{nullable:true})
  genres: string[];
}
