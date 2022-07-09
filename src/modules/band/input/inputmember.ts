import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class InputMember {
  @Field(() => String, { nullable: true })
  artist: string;
  @Field({ nullable: true })
  instrument: string;
  @Field(() => [String], { nullable: true })
  years: string[];
}
