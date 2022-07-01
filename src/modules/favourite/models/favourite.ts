import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Favourite {
  @Field()
  id: string;
  @Field()
  userId: string;
  @Field(()=>[String],{ nullable: true })
  bands: string[];
  @Field(()=>[String],{ nullable: true })
  genres: string[];
  @Field(()=>[String],{ nullable: true })
  artists: string[];
  @Field(()=>[String],{ nullable: true })
  tracks: string[];
}
