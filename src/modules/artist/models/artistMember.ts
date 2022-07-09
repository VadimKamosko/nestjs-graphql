import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ArtistMember {
  @Field(() => String, { nullable: false })
  id: string;
  @Field({ nullable: true })
  firstName: string;
  @Field({ nullable: true })
  secondName: string;
  @Field({ nullable: true })
  middleName: string;
}
