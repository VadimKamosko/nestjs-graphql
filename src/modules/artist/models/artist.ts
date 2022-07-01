import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Band } from 'src/modules/band/models/band';

@ObjectType('Artist')
export class Artist {
  @Field(() => String, { nullable: false })
  id: string;
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
  @Field(() => [Band], { nullable: true })
  bands: Band[];
  @Field(() => [String], { nullable: true })
  instruments: string[];
}
