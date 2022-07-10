import { Field, InputType } from '@nestjs/graphql';
import { InputMember } from './inputmember';

@InputType()
export class CreateInputBand {
  @Field({ nullable: true })
  name: string;
  @Field({ nullable: true })
  origin: string;
  @Field(() => [InputMember], { nullable: true })
  members: InputMember[];
  @Field({ nullable: true })
  website: string;
  @Field(() => [String], { nullable: true })
  genres: string[];
}
