import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateInputGenretofav {
  @Field()
  genres: string;
}
