import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateInputAlbum {
  @Field()
  id: string;
  @Field({ nullable: true })
  name: string;
  @Field(() => Int, { nullable: true })
  released: number;
  @Field(() => [String], { nullable: true })
  artists: string[];
  @Field(() => [String], { nullable: true })
  bands: string[];
  @Field(() => [String], { nullable: true })
  tracks: string[];
  @Field(() => [String], { nullable: true })
  genres: string[];
  @Field({ nullable: true })
  image: string;
}
