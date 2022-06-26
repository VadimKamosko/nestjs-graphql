import { Injectable } from '@nestjs/common';
import { CreateArtistInput } from './imput/create-artist.input';
import { Artist } from './models/artist';
import { v4 as uuidv4 } from 'uuid';
import { UpdateArtistinput } from './imput/update-artistinput';
import { GetArtistArgs } from './DTO/get-artist.args';
import { GetArtistsArgs } from './DTO/get-artists.args';
import { DeleteArtistInput } from './imput/delete-artistinput';

@Injectable()
export class ArtistService {
  private readonly artists: Artist[] = [];

  public createArtist(createArtist: CreateArtistInput): Artist {
    const artist: Artist = {
      _id: uuidv4(),
      ...createArtist,
    };
    this.artists.push(artist);
    return artist;
  }
  public updateArtist(updateArt: UpdateArtistinput): Artist {
    const artist = this.artists.find((i) => i._id === updateArt._id);
    Object.assign(artist, updateArt);
    return artist;
  }
  public getArtist(getArtistArg: GetArtistArgs): Artist {
    return this.artists.find((i) => i._id === getArtistArg._id);
  }
  public getArtists(getArtistsArgs: GetArtistsArgs): Artist[] {
    return getArtistsArgs._id.map((i) => this.getArtist({ _id: i }));
  }
  public deleteArist(getArtistsArgs: DeleteArtistInput): Artist {
    const id = this.artists.findIndex((i) => i._id === getArtistsArgs._id);
    const artist = this.artists[id];
    this.artists.splice(id, 1);
    return artist;
  }
}
