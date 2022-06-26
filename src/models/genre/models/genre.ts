import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Genre {
    @Field()
    _id: string;
    @Field()
    name: string;
    @Field()
    description: string;
    @Field()
    country: string;
    @Field()
    year: string;
    @Field(() => [String], { nullable: true })
    subGenresIds: string[];
}
