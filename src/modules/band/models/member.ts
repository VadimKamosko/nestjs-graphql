import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType("MemberInput")
@ObjectType()
export class Member {
  @Field({nullable:true})
  artist: string;
  @Field({nullable:true})
  instrument: string;
  @Field(() => [String],{nullable:true})
  years: string[];
}
