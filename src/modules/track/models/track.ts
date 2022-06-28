import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Band } from 'src/modules/band/models/band';
import { Genre } from 'src/modules/genre/models/genre';

@ObjectType()
export class Track {
  @Field()
  _id: string;

  @Field({nullable:true})
  title: string;

  @Field({nullable:true})
  albumId: string;

  @Field(() => [Band],{nullable:true})
  bands: Band[];

  @Field(()=>Int)
  duration: number;

  @Field(()=>Int)
  released: number;

  @Field(() => [Genre],{nullable:"items"})
  genre: Genre[];
}
