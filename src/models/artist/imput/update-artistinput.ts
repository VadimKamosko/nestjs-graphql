import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
export class UpdateArtistinput {
  @Field()
  @IsNotEmpty()
  _id: string;
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
  @Field({nullable:true})
  deathDate: string ;
  @Field({nullable:true})
  deathPlace: string;
  @Field()
  @IsNotEmpty()
  country: string;
  @IsOptional()
  @Field(() => [String],{nullable:true})
  bandsIds?: string[];
  @IsOptional()
  @Field(() => [String],{nullable:true})
  instruments?: string;
  @IsOptional()
  @Field(() => [String],{nullable:true})
  pseudonims?: string;
  @IsOptional()
  @Field(() => [String],{nullable:true})
  labels?: string ;
}
