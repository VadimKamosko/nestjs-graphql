import { Field, InputType } from '@nestjs/graphql';
import { Member } from '../models/member';

@InputType()
export class CreateInputBand {
  @Field({ nullable: true })
  name: string;
  @Field({ nullable: true })
  origin: string;
  @Field(() => [Member], { nullable: true })
  members: Member[];
  @Field({ nullable: true })
  website: string;
  @Field(() => [String], { nullable: true })
  genresIds: string[];
}
