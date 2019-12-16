import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { PlaylistAddEditComponent } from '../playlist-table/playlist-add-edit/playlist-add-edit.component';
import { MatDialog } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  constructor(public dialog: MatDialog) { }

  titleFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.pattern(/^[ '.()\p{L}\p{N}]+$/u)

  ]);

  reviewFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.pattern(/^[ :'.()\p{L}\p{N}]+$/u)

  ]);

    visiblityFormControl = new FormControl('', [
    Validators.required
  ]);


  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    _id: new FormControl(null),
    playlist_title: this.titleFormControl,
    playlist_desc: this.reviewFormControl,
    visiblity : this.visiblityFormControl,
  });

  initializeFormGroup() {
    this.form.setValue({
      $key: null,
      _id: '',
      playlist_title: '',
      playlist_desc: '',
      visiblity: ''
    });
  }

  populateForm(playlist) {
    this.form.setValue({
      $key: 'modify',
      _id: playlist._id,
      playlist_title: playlist.playlist_title,
      playlist_desc: playlist.playlist_desc,
      visiblity: playlist.visiblity      
    });
  }

  playlistDialog(dialogConfig): Observable<any> {

    const dialogRef = this.dialog.open(PlaylistAddEditComponent, dialogConfig);

    return dialogRef.afterClosed();
  }


}
