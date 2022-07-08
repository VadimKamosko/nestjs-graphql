import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";
import { InputMember } from "./inputmember";

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
    @Field(()=>[InputMember],{ nullable: true })
    members:InputMember[]
    @Field({ nullable: true })
    website:string
    @Field(()=>[String],{ nullable: true })
    genres:string[]
}