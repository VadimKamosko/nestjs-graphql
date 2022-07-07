import { HttpService } from '@nestjs/axios';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { AlbumService } from 'src/modules/album/album.service';
import { Album } from 'src/modules/album/models/album';
import { ArtistService } from 'src/modules/artist/artist.service';
import { Artist } from 'src/modules/artist/models/artist';
import { BandService } from 'src/modules/band/band.service';
import { Band } from 'src/modules/band/models/band';
import { GenreService } from 'src/modules/genre/genre.service';
import { Genre } from 'src/modules/genre/models/genre';
import { Track } from 'src/modules/track/models/track';
import { TrackService } from 'src/modules/track/track.service';

@Injectable()
export class ReferenceService {
  private artServ: ArtistService;
  private bandServise: BandService;
  private trackService: TrackService;
  private albService: AlbumService;
  private genreServise: GenreService;

  constructor(private moduleRef: ModuleRef) {}

  onModuleInit() {
    this.artServ = this.moduleRef.get(ArtistService, { strict: false });
    this.bandServise = this.moduleRef.get(BandService, { strict: false });
    this.trackService = this.moduleRef.get(TrackService, { strict: false });
    this.albService = this.moduleRef.get(AlbumService, { strict: false });
    this.genreServise = this.moduleRef.get(GenreService, { strict: false });
  }

  async getByids(data) {
    let artists: Artist[];
    let bands: Band[];
    let genres: Genre[];
    let tracks: Track[];
    let albums: Album;
    if (data.artistsIds && data.artistsIds !== null) {
      artists = await Promise.all(
        data.artistsIds.map(
          async (i) =>
            (await this.artServ.getArtist({ id: i })) || { id: 'not found' },
        ),
      );
      delete data['artistsIds'];
      data.artists = artists;
    }
    if (data.bandsIds && data.bandsIds !== null) {
      bands = await Promise.all(
        data.bandsIds.map(
          async (i) =>
            (await this.bandServise.getBand({ id: i })) || {
              id: 'not found',
            },
        ),
      );
      delete data['bandsIds'];
      data.bands = bands;
    }
    if (data.genresIds && data.genresIds !== null) {
      genres = await Promise.all(
        data.genresIds.map(
          async (i) =>
            (await this.genreServise.getGenre({ id: i })) || {
              id: 'not found',
            },
        ),
      );

      delete data['genresIds'];
      data.genres = genres;
    }
    if (data.trackIds && data.trackIds !== null) {      
      tracks = await Promise.all(
        data.trackIds.map(
          async (i) =>
            (await this.trackService.getTrack({ id: i }, data._id)) || {
              id: 'not found',
            },
        ),
      );
      delete data['trackIds'];
      data.tracks = tracks;
    }
    if (data.albumId && data.albumId !== null) {
      albums = await this.albService.getAlbum({ id: data.albumId });
      delete data['albumId'];
      data.albums = albums;
    }

    data.id = data._id;
    delete data['_id'];

    return data;
  }
  async renameField(Obj) {
    if (Obj.genres) {
      Obj['genresIds'] = Obj.genres;
      delete Obj['genres'];
    }
    if (Obj.bands) {
      Obj['bandsIds'] = Obj.bands;
      delete Obj['bands'];
    }
    if (Obj.bands) {
      Obj['trackIds'] = Obj.tracks;
      delete Obj['tracks'];
    }
    if (Obj.artists) {
      Obj['artistsIds'] = Obj.artists;
      delete Obj['artists'];
    }
    if (Obj.albums) {
      Obj['albumId'] = Obj.albums;
      delete Obj['albums'];
    }

    return Obj;
  }
}
