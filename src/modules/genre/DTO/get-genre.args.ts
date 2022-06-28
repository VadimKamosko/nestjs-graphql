import { ArgsType, Field } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@ArgsType()
export class GetGenreArg{
    @Field()
    @IsNotEmpty()
    _id:string

}