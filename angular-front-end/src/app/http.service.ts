import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Song } from './models/song.model';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getSongs() {
    return this.http.get<Song[]>('http://localhost:8080/api/open/song/top_n');
  }



  addItem(item) {

    return this.http.post('http://127.0.0.1:8080/library/item', item);

  }


}
