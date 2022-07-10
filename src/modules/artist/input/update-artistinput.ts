import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateArtistinput {
  @Field()
  @IsNotEmpty()
  id: string;
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
  bands: string[] | [];
  @Field(() => [String], { nullable: true })
  instruments: string[];
}
