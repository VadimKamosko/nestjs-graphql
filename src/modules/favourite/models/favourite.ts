import { Field, ObjectType } from "@nestjs/graphql";
import { Artist } from "src/modules/artist/models/artist";
import { Band } from "src/modules/band/models/band";
import { Genre } from "src/modules/genre/models/genre";
import { Track } from "src/modules/track/models/track";
import { User } from "src/user/models/user";

@ObjectType()
export class Favourite
{
    @Field()
    _id:string
    @Field()
    userId:User["_id"]
    @Field({nullable:true})
    bands: Band["_id"]
    @Field({nullable:true})
    genres: Genre['_id']
    @Field({nullable:true})
    artists: Artist["_id"]
    @Field({nullable:true})
    tracks: Track["_id"]

}