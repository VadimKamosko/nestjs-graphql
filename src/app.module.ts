import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ArtistModule } from './models/artist/artist.module';
import { GenreModule } from './models/genre/genre.module';
import { TrackModule } from './models/track/track.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      context: ({ req }) => {
        const token = req.headers.authorization || '';
        return {token}
      },
    }), 
    ArtistModule, GenreModule, TrackModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
