import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class SongService {
  module: string;

  titleFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.pattern(/^[ '.()\p{L}\p{N}]+$/u)

  ]);

  artistFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.pattern(/^[ ,'.()\p{L}\p{N}]+$/u)

  ]);

  albumFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.pattern(/^[ :'.()\p{L}\p{N}]+$/u)

  ]);

  yearFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
    Validators.pattern('[0-9 ]*'),
    Validators.min(1950),
    Validators.max(2019)
  ]);

  genreFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.pattern(/^[ ,\p{L}\p{N}]+$/u)

  ]);

  trackFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(1),
    Validators.pattern('[0-9 ]*'),
    Validators.min(1),
    Validators.max(999)
  ]);


  lengthFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(1),
    Validators.pattern('[0-9 ]*'),
    Validators.min(1),
    Validators.max(9999)
  ]);

  constructor() { }

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    _id: new FormControl(null),
    title: this.titleFormControl,
    artist: this.artistFormControl,
    album: this.albumFormControl,
    year: this.yearFormControl,
    genre: this.genreFormControl,
    track: this.trackFormControl,
    length: this.lengthFormControl
  });

  initializeFormGroup() {
    this.form.setValue({
      $key: null,
      _id: '',
      title: '',
      artist: '',
      album: '',
      year: '',
      genre: '',
      track: '',
      length: ''
    });
  }

  populateForm(song) {
    this.form.setValue({
      $key: 'modify',
      _id: song._id,
      title: song.Title,
      artist: song.Artist,
      album: song.Album,
      year: song.Year,
      genre: song.Genre,
      track: song.Track,
      length: song.Length
    });
  }

}
