import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class SearchTrack {
  @Field({ nullable: true })
  title: string;

  @Field({ nullable: true })
  albums: string;

  @Field(() => [String], { nullable: true })
  bands: string[];

  @Field(() => Int, { nullable: true })
  duration: number;

  @Field(() => Int, { nullable: true })
  released: number;
}
