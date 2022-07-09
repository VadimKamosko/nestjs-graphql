import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Artist } from 'src/modules/artist/models/artist';
import { Band } from 'src/modules/band/models/band';
import { Genre } from 'src/modules/genre/models/genre';
import { Track } from 'src/modules/track/models/track';

@ObjectType()
export class Album {
  @Field()
  id: string;
  @Field({ nullable: true })
  name: string;
  @Field(() => Int, { nullable: true })
  released: number;
  @Field(() => [Artist], { nullable: true })
  artists: Artist[];
  @Field(() => [Band], { nullable: true })
  bands: Band[];
  @Field(() => [Track], { nullable: true })
  tracks: Track[];
  @Field(() => [Genre], { nullable: true })
  genres: Genre[];
  @Field({ nullable: true })
  image: string;
}
