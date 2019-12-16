import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Review } from '../models/review.model';
import { Song } from '../models/song.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Playlist } from '../models/Playlist.model';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getReviews(id: string) {
    return this.http.get<Review[]>(`http://localhost:8080/api/open/review/${id}`);
  }
  getSongs() {
    return this.http.get<Song[]>('http://localhost:8080/api/open/song/top_n');
  }


  insertSong(song) {
    return this.http.post<any>('http://localhost:8080/api/secure/song', song);
  }


 addReview1(review) {
    return this.http.post<any>('http://localhost:8080/api/secure/review', review);
  }


  deleteSong(song) {
    return this.http.delete<any>(`http://localhost:8080/api/admin/song/${song._id}`);
  }

  getSongDetails(song) {
    return this.http.get<Song>(`http://localhost:8080/api/open/song/${song._id}`);
  }

  updateSong(song) {
    return this.http.put<any>('http://localhost:8080/api/admin/song', song);
  }




  findSongs(
    songId: number, filter = '', sortOrder = 'asc',
    pageNumber = 0, pageSize = 0): Observable<Song[]> {

    return this.http.get(`http://localhost:8080/api/open/song/search/${filter}`, {
    }).pipe(map(res => {
      res['payload'] = res;
      return res['payload'];
    })
    );
  }

  loadPlaylistSongs(playlist_id: string, filter = '', sortOrder = 'asc', pageNumber = 0, pageSize = 0): Observable<Song[]> {

    return this.http.get(`http://localhost:8080/api/secure/playlist/${playlist_id}`, {
    }).pipe(map(res => {
      res['payload'] = res;
      return res['payload'];
    })
    );
  }
  getTop10Songs(): Observable<Song[]> {

    return this.http.get('http://localhost:8080/api/open/song/top_n', {
    }).pipe(map(res => {
      res['payload'] = res;
      return res['payload'];
    })
    );
  }

  findUserPlaylists(songId: number, filter = '', sortOrder = 'asc', pageNumber = 0, pageSize = 0): Observable<Playlist[]> {

    return this.http.get(`http://localhost:8080/api/secure/playlist/user/5de2ccd21c9d440000dd95b2`, {
    }).pipe(map(res => {
      res['payload'] = res;
      return res['payload'];
    })
    );
  }

}
