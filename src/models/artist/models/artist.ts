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
  deathDate?: string | null;
  @Field({ nullable: true })
  deathPlace?: string | null;
  @Field({ nullable: true })
  country: string;
  @Field(() => [String], { nullable: true })
  bandsIds?: string[];
  @Field(() => [String], { nullable: true })
  instruments?: string[];
  @Field(() => [String], { nullable: true })
  pseudonims?: string[];
  @Field(() => [String], { nullable: true })
  labels?: string[];
}
