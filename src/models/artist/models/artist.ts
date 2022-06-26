import { Field, InputType, ObjectType } from '@nestjs/graphql';


@ObjectType('Artist')
@InputType('ArtInput')
export class Artist {
  @Field(() => String, { nullable: false })
  _id: string;
  @Field()
  firstName: string;
  @Field()
  secondName: string;
  @Field()
  middleName: string;
  @Field()
  birthDate: string;
  @Field()
  birthPlace: string;
  @Field({ nullable: true })
  deathDate?: string | null;
  @Field({ nullable: true })
  deathPlace?: string | null;
  @Field()
  country: string;
  @Field(() => [String], { nullable: true })
  bandsIds?: string[];
  @Field(() => [String], { nullable: true })
  instruments?: string[]
  @Field(() => [String], { nullable: true })
  pseudonims?: string[] ;
  @Field(() => [String], { nullable: true })
  labels?: string[];
}
