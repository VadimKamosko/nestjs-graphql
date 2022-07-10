import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class DeleteTrackInput {
  @Field()
  @IsNotEmpty()
  id: string;
}
