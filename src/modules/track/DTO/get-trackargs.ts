import { ArgsType, Field } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@ArgsType()
export class GetTrackArg{
    @Field()
    @IsNotEmpty()
    id:string

}