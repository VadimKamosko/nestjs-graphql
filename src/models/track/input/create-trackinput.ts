import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { CreateArtistInput } from 'src/models/artist/imput/create-artist.input';

@InputType()
export class CreateTrackInput {
  @Field()
  title: string;

  @Field()
  albums: string;

  @Field(() => [String])
  bands: string[];

  @Field(() => Int)
  duration: number;

  @Field(() => Int)
  released: number;

  @Field(() => [String])
  genre: string[];
}
