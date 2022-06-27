import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateTrackInput {
  @Field()
  _id: string;

  @Field()
  title: string;

  @Field()
  albums: string;

  @Field(() => [String])
  bands: string[];

  @Field(()=>Int)
  duration: number;

  @Field(()=>Int)
  released: number;

  @Field(() => [String])
  genre: string[];
}
