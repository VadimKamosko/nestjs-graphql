import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class DeleteAlbumInput {
  @Field()
  @IsNotEmpty()
  id: string;
}
