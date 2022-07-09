import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateInputBandtofav {
  @Field()
  bands: string;
}
