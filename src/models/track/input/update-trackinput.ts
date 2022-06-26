import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { Artist } from 'src/models/artist/models/artist';


@InputType()
export class UpdateTrackInput {
  @Field()
  @IsNotEmpty()
  _id: string;
  @Field(() => [Artist], { nullable: 'items' })
  artists: Artist[];
  @Field(() => [String], { nullable: true })
  bands: string[];
  @Field()
  @IsNotEmpty()
  year: number;
  @Field({ nullable: true })
  albumId: string;
  @Field()
  @IsNotEmpty()
  name: string;
  @Field()
  @IsNotEmpty()
  description: string;
  @Field()
  @IsNotEmpty()
  lyrics: string;
  @Field()
  @IsNotEmpty()
  length: number;
  @Field()
  @IsNotEmpty()
  authorsIds: number;
}
