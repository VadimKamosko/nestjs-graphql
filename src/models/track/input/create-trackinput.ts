import { Field, InputType, Int } from '@nestjs/graphql';
import { CreateInputBand } from 'src/models/band/imput/create-bandinput';
import { CreateGenreInput } from 'src/models/genre/input/create-genre.input';
import { Genre } from 'src/models/genre/models/genre';

@InputType()
export class CreateTrackInput {
  @Field({ nullable: true })
  title: string;

  @Field({ nullable: true })
  albumId: string;

  @Field(() => [CreateInputBand], { nullable: true })
  bands: CreateInputBand[];

  @Field(() => Int)
  duration: number;

  @Field(() => Int)
  released: number;

  @Field(() => [CreateGenreInput],{nullable:true})
  genre: CreateGenreInput[];
}
