import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
export class UpdateArtistinput {
  @Field()
  @IsNotEmpty()
  _id: string;
  @Field({ nullable: true })
  @IsNotEmpty()
  firstName: string;
  @Field({ nullable: true })
  @IsNotEmpty()
  secondName: string;
  @Field({ nullable: true })
  @IsNotEmpty()
  middleName: string;
  @Field({ nullable: true })
  @IsNotEmpty()
  birthDate: string;
  @Field({ nullable: true })
  @IsNotEmpty()
  birthPlace: string;
  @Field({ nullable: true })
  @IsNotEmpty()
  country: string;
  @Field(() => [String], { nullable: true })
  bandsIds: string[] | [];
  @Field(() => [String], { nullable: true })
  instruments: string[];
}
