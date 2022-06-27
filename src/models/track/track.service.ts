import { Injectable } from '@nestjs/common';
import { GetTrackArg } from './DTO/get-trackargs';
import { GetTracksArg } from './DTO/get-tracksargs';
import { CreateTrackInput } from './input/create-trackinput';
import { v4 as uuidv4 } from 'uuid';
import { Track } from './models/track';
import { UpdateTrackInput } from './input/update-trackinput';
import { DeleteTrackInput } from './input/delete-trackinput';
import { ArtistService } from '../artist/artist.service';
import { Artist } from '../artist/models/artist';

@Injectable()
export class TrackService {
  constructor(private readonly artSer: ArtistService) {}
  private tracks: Track[] = [];

  getTrack(id: GetTrackArg) {
    return this.tracks.find((i) => i._id === id._id);
  }
  getTracks(tracks: GetTracksArg) {
    return tracks._id.map((i) => this.getTrack({ _id: i }));
  }
  createTrack(bodyTrack: CreateTrackInput) {

    let track: Track = {
      _id: uuidv4(),
      ...bodyTrack,
    };

    this.tracks.push(track);
    return track;
  }
  updateTrack(bodyTrack: UpdateTrackInput) {
    const track = this.tracks.find((i) => i._id === bodyTrack._id);
    Object.assign(track, bodyTrack);
    return track;
  }
  deleteTrack(bodyDelTracl: DeleteTrackInput) {
    const idtrack = this.tracks.findIndex((i) => i._id === bodyDelTracl._id);
    const track = this.tracks[idtrack];
    this.tracks.splice(idtrack);
    return track;
  }
}
