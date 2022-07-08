import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Album } from 'src/modules/album/models/album';
import { Artist } from 'src/modules/artist/models/artist';
import { Band } from 'src/modules/band/models/band';
import { Genre } from 'src/modules/genre/models/genre';

@ObjectType()
export class Track {
  @Field()
  id: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  albums: Album;

  @Field(() => [Band], { nullable: true })
  bands: Band[];

  @Field(() => [Artist], { nullable: true })
  artists: Artist[];

  @Field(() => Int, { nullable: true })
  duration: number;

  @Field(() => Int, { nullable: true })
  released: number;

  @Field(() => [Genre], { nullable: 'items' })
  genres: Genre[];
}
