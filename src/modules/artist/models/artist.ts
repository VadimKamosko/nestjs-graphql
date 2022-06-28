import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType('Artist')
@InputType('ArtInput')
export class Artist {
  @Field(() => String, { nullable: false })
  _id: string;
  @Field({ nullable: true })
  firstName: string;
  @Field({ nullable: true })
  secondName: string;
  @Field({ nullable: true })
  middleName: string;
  @Field({ nullable: true })
  birthDate: string;
  @Field({ nullable: true })
  birthPlace: string;
  @Field({ nullable: true })
  country: string;
  @Field(() => [String], { nullable: true })
  bands: string[];
  @Field(() => [String], { nullable: true })
  instruments: string[];
}
