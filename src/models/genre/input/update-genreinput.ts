import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
export class UpdateGenreInput {
    @Field()
    @IsNotEmpty()
    _id: string;
    @Field()
    @IsNotEmpty()
    name: string;
    @Field()
    @IsNotEmpty()
    description: string;
    @Field()
    @IsNotEmpty()
    country: string;
    @Field()
    @IsNotEmpty()
    year: string;
    @IsOptional()
    @Field(() => [UpdateGenreInput],{nullable:true})
    subGenresIds: UpdateGenreInput[];
}
