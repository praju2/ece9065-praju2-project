import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Review } from '../models/review.model';
import { Song } from '../models/song.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Playlist } from '../models/Playlist.model';
import { environment } from '../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class HttpService {

  baseUrl = environment.baseUrl;
  openUrl=this.baseUrl +'/api/open';
  secureUrl=this.baseUrl +'/api/secure';
  adminUrl='http://localhost:8080/api/admin'


  constructor(private http: HttpClient) { }

  getReviews(id: string) {
    return this.http.get<Review[]>(this.openUrl+ `/review/${id}`);
  }
  getSongs() {
    return this.http.get<Song[]>(this.openUrl+'/song/top_n');
  }


  insertSong(song) {
    return this.http.post<any>(this.secureUrl+'/song', song);
  }

  insertPlaylist(playlist) {
    return this.http.post<any>(this.secureUrl+'/playlist', playlist);
  }

  updatePlaylist(playlist) {
    return this.http.put<any>(this.secureUrl+'/playlist', playlist);
  }




 addReview1(review) {
    return this.http.post<any>(this.secureUrl+'/review', review);
  }


  deleteSong(song) {
    return this.http.delete<any>(this.adminUrl+`/song/${song._id}`);
  }

  getSongDetails(song) {
    return this.http.get<Song>(this.openUrl+`/song/${song._id}`);
  }

  updateSong(song) {
    return this.http.put<any>(this.adminUrl+'/song', song);
  }




  findSongs(
    songId: number, filter = '', sortOrder = 'asc',
    pageNumber = 0, pageSize = 0): Observable<Song[]> {

    return this.http.get(this.openUrl+`/song/search/${filter}`, {
    }).pipe(map(res => {
      res['payload'] = res;
      return res['payload'];
    })
    );
  }

  loadPlaylistSongs(playlist_id: string, filter = '', sortOrder = 'asc', pageNumber = 0, pageSize = 0): Observable<Song[]> {
    return this.http.get(this.secureUrl+`/playlist/${playlist_id}`, {
    }).pipe(map(res => {
      res['payload'] = res;      
      return res['payload'];
    })
    );
  }
  getTop10Songs(): Observable<Song[]> {

    return this.http.get(this.openUrl+'/song/top_n', {
    }).pipe(map(res => {
      res['payload'] = res;
      return res['payload'];
    })
    );
  }

  findUserPlaylists(playlistId: number, filter = '', sortOrder = 'asc', pageNumber = 0, pageSize = 0): Observable<Playlist[]> {
    return this.http.get(this.secureUrl+`/playlist/user/${filter}`, {
    }).pipe(map(res => {
      res['payload'] = res;
      return res['payload'];
    })
    );
  }

  searchPlaylists(playlistId: number, filter = '', sortOrder = 'asc', pageNumber = 0, pageSize = 0): Observable<Playlist[]> {
    return this.http.get(this.secureUrl+`/playlist/search/${filter}`, {
    }).pipe(map(res => {
      res['payload'] = res;
      return res['payload'];
    })
    );
  }

}
