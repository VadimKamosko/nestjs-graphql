
import { Resolver,Query } from '@nestjs/graphql';
import { FavouriteService } from './favourite.service';
import { Favourite } from './models/favourite';

@Resolver()
export class FavouriteResolver {
    constructor(private readonly favService:FavouriteService){}
    @Query(()=>Favourite,{name:"fav",nullable:true})
    getfav()
    {
        return this.favService.getFavs();
    }
}
