import { Component, OnInit } from '@angular/core';
import { SongService } from '../../services/song.service';
import { HttpService } from '../../services/http.service';
import { MatDialogRef } from '@angular/material';
import { Song } from '../../models/song.model';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-song-add-edit',
  templateUrl: './song-add-edit.component.html',
  styleUrls: ['./song-add-edit.component.scss']
})
export class SongAddEditComponent implements OnInit {

  constructor(private _song: SongService,private _http: HttpService,private _notification:NotificationService,
    private dialogRef: MatDialogRef<SongAddEditComponent>) { }

  ngOnInit() {
  }

  onClear() {
    this._song.form.reset();
    this._song.initializeFormGroup();       
  }

  onSubmit() {
 
    if (this._song.form.valid) {
      const song:Song={Reviews: null,
        Hidden: false,
        _id: null,
        Title: this._song.form.value.title,
        Artist: this._song.form.value.artist,
        Album: this._song.form.value.album,
        Track: this._song.form.value.track,
        Year: this._song.form.value.year,
        Length: this._song.form.value.length,
        Genre: this._song.form.value.genre,
        Rating: null};  
      //if (!this._song.form.get('$key').value)
        this._http.insertSong(song);
      //else
        //this._song.updateEmployee(this._song.form.value);
      this._notification.success(':: Submitted successfully');
      this.onClose();
    }
  }

  onClose() {
   this.onClear();
    this.dialogRef.close();
  }

}
