import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";
import { Member } from "../models/member";

@InputType()
export class UpdateInputBand
{
    @Field()
    @IsNotEmpty()
    id:string
    @Field({ nullable: true })
    name:string
    @Field({ nullable: true })
    origin:string
    @Field(()=>[Member],{ nullable: true })
    members:Member[]
    @Field({ nullable: true })
    website:string
    @Field(()=>[String],{ nullable: true })
    genres:string[]
}