import { Field, InputType, Int } from '@nestjs/graphql';
import { CreateInputBand } from 'src/modules/band/imput/create-bandinput';
import { CreateGenreInput } from 'src/modules/genre/input/create-genre.input';

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
