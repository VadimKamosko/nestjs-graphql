import { Field, ObjectType } from '@nestjs/graphql';
import { Artist } from 'src/modules/artist/models/artist';
import { Band } from 'src/modules/band/models/band';
import { Genre } from 'src/modules/genre/models/genre';
import { Track } from 'src/modules/track/models/track';

@ObjectType()
export class Favourite {
  @Field()
  id: string;
  @Field()
  userId: string;
  @Field(() => [Band], { nullable: true })
  bands: Band[];
  @Field(() => [Genre], { nullable: true })
  genres: Genre[];
  @Field(() => [Artist], { nullable: true })
  artists: Artist[];
  @Field(() => [Track], { nullable: true })
  tracks: Track[];
}
