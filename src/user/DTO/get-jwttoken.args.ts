import { ArgsType, Field } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@ArgsType()
export class GetJWT{
    @Field()
    @IsNotEmpty()
    email:string
    @Field()
    @IsNotEmpty()
    password:string
}