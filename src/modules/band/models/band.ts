import { Field, ObjectType } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";
import { Member } from "./member";


@ObjectType()
export class Band
{
    @Field()
    @IsNotEmpty()
    _id:string
    @Field({nullable:true})
    name:string
    @Field({nullable:true})
    origin:string
    @Field(()=>[Member],{nullable:true})
    members:Member[]
    @Field({nullable:true})
    website:string
    @Field(()=>[String],{nullable:"items"})
    genresIds:string[]
}

