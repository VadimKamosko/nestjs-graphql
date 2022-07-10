import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateInputArtisttofav {
  @Field()
  artists: string;
}
