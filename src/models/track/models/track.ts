import { Field, ObjectType } from "@nestjs/graphql";
import { Artist } from "src/models/artist/models/artist";

@ObjectType()
export class Track{
        @Field()
        _id: string;

        @Field(() => [Artist], { nullable: true })
        artists!: Artist[];

        @Field(() => [String], { nullable: true })
        bands: string[];

        @Field()
        year: number;
        
        @Field()
        albumId: string;

        @Field()
        name: string;

        @Field()
        description: string;

        @Field()
        lyrics: string;

        @Field()
        length: number;

        @Field()
        authorsIds: number; 
}
