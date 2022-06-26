import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateArtistInput {
  @Field()
  @IsNotEmpty()
  firstName: string;
  @Field()
  @IsNotEmpty()
  secondName: string;
  @Field()
  @IsNotEmpty()
  middleName: string;
  @Field()
  @IsNotEmpty()
  birthDate: string;
  @Field()
  @IsNotEmpty()
  birthPlace: string;
  @Field({ nullable: true })
  deathDate: string;
  @Field({ nullable: true })
  deathPlace: string;
  @Field()
  @IsNotEmpty()
  country: string;
  @Field(() => [String], { nullable: true })
  bandsIds: string[] | [];
  @Field(() => [String], { nullable: true })
  instruments: string[] | [];
  @Field(() => [String], { nullable: true })
  pseudonims: string[] | [];
  @Field(() => [String], { nullable: true })
  labels: string[] | [];
}
