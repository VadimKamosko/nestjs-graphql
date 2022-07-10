import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class DeleteBandInput {
  @Field()
  @IsNotEmpty()
  id: string;
}
