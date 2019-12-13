import { User } from './user.model';
import { Song } from './song.model';

export interface Playlist {
    visiblity:  string;
    _id: string;
    playlist_title: string;
    playlist_desc : string;
    user_id: String; 
    songs: Song[];   
}
