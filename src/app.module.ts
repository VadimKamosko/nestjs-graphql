import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ArtistModule } from './modules/artist/artist.module';
import { GenreModule } from './modules/genre/genre.module';
import { TrackModule } from './modules/track/track.module';
import { UserModule } from './modules/user/user.module';
import { BandModule } from './modules/band/band.module';
import { FavouriteModule } from './modules/favourite/favourite.module';
import { AlbumModule } from './modules/album/album.module';
import { ReferenceModule } from './reference/reference.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      context: ({ req }) => {
        const token =
          req.headers['authorization'] || req.headers['Authorization'] || '';
        return { token };
      },
    }),
    ConfigModule.forRoot(),
    ArtistModule,
    GenreModule,
    TrackModule,
    UserModule,
    BandModule,
    FavouriteModule,
    AlbumModule,
    ReferenceModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
