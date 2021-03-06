import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field()
  _id: string;
  @Field()
  firstName: string;
  @Field()
  lastName: string;
  @Field()
  passwordd: string;
  @Field()
  email: string;
}
