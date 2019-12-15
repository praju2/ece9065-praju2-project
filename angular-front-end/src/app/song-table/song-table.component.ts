import { AfterViewInit, Component, OnInit, ViewChild, OnDestroy, ElementRef, Input, HostListener } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { SongTableDataSource } from './song-table-datasource';
import { Song } from '../models/song.model';
import { HttpService } from '../services/http.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Subscription, Subject, fromEvent } from 'rxjs';
import { ReviewComponent } from './review/review.component';
import { SongService } from '../services/song.service';
import { AuthService } from '../services/auth.service';
import { SongAddEditComponent } from './song-add-edit/song-add-edit.component';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-song-table',
  templateUrl: './song-table.component.html',
  styleUrls: ['./song-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class SongTableComponent implements OnInit, AfterViewInit, OnDestroy {


  dataSource: SongTableDataSource;
  
  subDelSong : Subscription;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  columnsToDisplay = ['Ranking', 'Title', 'Artist', ' '];
  expandedElement: Song | null;



  constructor(private _http: HttpService, private dialog: MatDialog, private _song: SongService, private _auth: AuthService, private _notification: NotificationService) {

  }

  ngOnInit() {
    this.dataSource = new SongTableDataSource(this._http);
    if (this._song.module == null) {
      this.dataSource.getTop10Songs();
    }

  }

  ngAfterViewInit() {
  }
  @HostListener('window:beforeunload')
  ngOnDestroy() {

    if (this.subDelSong) {
      this.subDelSong.unsubscribe();
    }
    if (this.dataSource.findSongsSubs) {
      this.dataSource.findSongsSubs.unsubscribe();
    }
    if (this.dataSource.topSongsSubs) {
      this.dataSource.topSongsSubs.unsubscribe();
    }
    if (this.dataSource.loadPlaylistSongsSubs) {
      this.dataSource.loadPlaylistSongsSubs.unsubscribe();
    }
  }

  findSongs(filter: string) {
    if (filter !== '') {
      this.columnsToDisplay = ['Title', 'Artist', ' '];
      this.dataSource.findSongs(
        1,
        filter,
        '',
        0,
        0);
    } else {
      this.columnsToDisplay = ['Ranking', 'Title', 'Artist', ' '];

      this.dataSource.getTop10Songs();
    }
  }

  openDialog(element) {
    const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose=true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.data = element;
    this.dialog.open(ReviewComponent, dialogConfig);
  }

  loadPlaylistSongs(element = '') {
    this.dataSource.loadPlaylistSongs(element);
    this.columnsToDisplay = ['Title', 'Artist', ' '];

  }

  onCreate() {
    this._song.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(SongAddEditComponent, dialogConfig);
  }

  onEdit(row) {
    this._song.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(SongAddEditComponent, dialogConfig);
  }

  onDelete(row) {
   this.subDelSong= this._http.deleteSong(row).subscribe(
      res => console.log('hey', res),
      err => console.log('error', err.error)
    );;
    this.findSongs('');
    this._notification.warn('Deleted successfully!!');
  }

}
