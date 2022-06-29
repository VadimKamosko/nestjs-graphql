import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateInputTracktofav
{
    @Field()
    tracks:string
}