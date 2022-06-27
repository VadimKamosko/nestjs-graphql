import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ArtistModule } from './models/artist/artist.module';
import { GenreModule } from './models/genre/genre.module';
import { TrackModule } from './models/track/track.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      context: ({ req }) => {
        const token = req.headers.authorization || '';
        return { token };
      },
    }),
    ArtistModule,
    GenreModule,
    TrackModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
