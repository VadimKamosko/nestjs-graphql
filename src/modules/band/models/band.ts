import { Field, ObjectType } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";
import { Genre } from "src/modules/genre/models/genre";
import { Member } from "./member";


@ObjectType()
export class Band
{
    @Field()
    @IsNotEmpty()
    id:string
    @Field({nullable:true})
    name:string
    @Field({nullable:true})
    origin:string
    @Field(()=>[Member],{nullable:true})
    members:Member[]
    @Field({nullable:true})
    website:string
    @Field(()=>[Genre],{nullable:"items"})
    genres:Genre[]
}

