import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Track {
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
