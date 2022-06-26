import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { CreateArtistInput } from 'src/models/artist/imput/create-artist.input';


@InputType()
export class CreateTrackInput {
  @Field(() => [CreateArtistInput], { nullable: true })
  artists!: CreateArtistInput[];
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
