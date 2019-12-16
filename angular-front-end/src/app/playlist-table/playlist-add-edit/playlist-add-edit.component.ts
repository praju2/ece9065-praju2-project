
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { PlaylistService } from 'src/app/services/playlist.service';
import { HttpService } from '../../services/http.service';
import { MatDialogRef } from '@angular/material';
import { Song } from '../../models/song.model';
import { NotificationService } from '../../services/notification.service';
import { ChildActivationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Playlist } from 'src/app/models/Playlist.model';
import { PlaylistTableComponent } from '../playlist-table.component';

@Component({
  selector: 'app-playlist-add-edit',
  templateUrl: './playlist-add-edit.component.html',
  styleUrls: ['./playlist-add-edit.component.scss']
})
export class PlaylistAddEditComponent implements OnInit, OnDestroy {

  selected: string = 'private';
  subInsSong: Subscription;
  subUpdSong: Subscription;
  subSongDetails: Subscription;

  constructor(private _auth: AuthService, private _playlist: PlaylistService, private _http: HttpService, private _notification: NotificationService,
    private dialogRef: MatDialogRef<PlaylistAddEditComponent>) { }

  ngOnInit() {
  }
  ngOnDestroy(): void {
    if (this.subInsSong) {
      this.subInsSong.unsubscribe();
    }
    if (this.subUpdSong) {
      this.subUpdSong.unsubscribe();
    }
    if (this.subSongDetails) {
      this.subSongDetails.unsubscribe();
    }
  }


  onClear() {
    this._playlist.form.reset();
    this._playlist.initializeFormGroup();
  }

  onClose() {
    this.onClear();
    this.dialogRef.close();
  }

  onSubmit() {

    if (this._playlist.form.valid) {
      const playlist: Playlist = {
        visiblity: this._playlist.form.value.visiblity,
        _id: this._playlist.form.value._id,
        playlist_title: this._playlist.form.value.playlist_title,
        playlist_desc: this._playlist.form.value.playlist_desc,
        user_id: this._auth.getUserDetails('user_id'),
        songs: []
      };

      if (this._playlist.form.get('$key').value != 'modify') {
        this._http.insertPlaylist(playlist).subscribe(
          res => { console.log('success', res); },
          err => console.log('error', err.error)
        );
      } else {
        this._http.updatePlaylist(playlist).subscribe(
          res => { console.log('success', res); },
          err => console.log('error', err.error)
        );
      }
      this._notification.success(':: Submitted successfully');
      this.onClose();

    }
  }


}
