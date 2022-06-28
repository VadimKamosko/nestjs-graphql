import { Field, InputType, Int } from '@nestjs/graphql';
import { UpdateInputBand } from 'src/models/band/imput/update-bandinput';
import { UpdateGenreInput } from 'src/models/genre/input/update-genreinput';


@InputType()
export class UpdateTrackInput {
  @Field()
  _id: string;

  @Field({nullable:true})
  title: string;

  @Field({nullable:true})
  albumId: string;

  @Field(() => [UpdateInputBand],{nullable:true})
  bands: UpdateInputBand[];

  @Field(()=>Int,{nullable:true})
  duration: number;

  @Field(()=>Int,{nullable:true})
  released: number;

  @Field(() => [UpdateGenreInput],{nullable:true})
  genre: UpdateGenreInput[];
}
