import { AfterViewInit, Component, OnInit, ViewChild, ElementRef, QueryList, ViewChildren, OnDestroy, HostListener } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { PlaylistTableDataSource } from './playlist-table-datasource';
import { Playlist } from '../models/playlist.model';
import { OpenService } from '../services/open.service';
import { SongService } from '../services/song.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Subscription, Subject, fromEvent } from 'rxjs';
import { ReviewComponent } from '../song-table/review/review.component';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { SongTableComponent } from '../song-table/song-table.component';

@Component({
  selector: 'app-playlist-table',
  templateUrl: './playlist-table.component.html',
  styleUrls: ['./playlist-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class PlaylistTableComponent implements AfterViewInit, OnInit, OnDestroy {

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatTable, { static: false }) table: MatTable<Playlist>;
  @ViewChild('input', { static: false }) input: ElementRef;
  @ViewChildren(SongTableComponent) SongTableComponentList: QueryList<SongTableComponent>;
  dataSource: PlaylistTableDataSource;


  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  columnsToDisplay = ['playlist_title', 'playlist_desc'];
  expandedElement: Playlist | null;

  constructor(private _http: OpenService, private dialog: MatDialog, private elementRef: ElementRef, private _song: SongService) {
    this._song.module = 'playlist';
  }


  ngOnInit() {
    this.dataSource = new PlaylistTableDataSource(this._http);
    this.dataSource.findUserPlaylists(1, '', '', 0, 0);

  }

  ngAfterViewInit() {
    // server-side search
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.findSongs();
        })
      )
      .subscribe();
  }

  @HostListener('window:beforeunload')
  ngOnDestroy() {
    this._song.module = null;
    if (this.dataSource.findUserPlaylistsSubs) {
      this.dataSource.findUserPlaylistsSubs.unsubscribe();

    }
  }

  loadPlaylistSongs(expandedElement) {
    if (expandedElement) {
      this.SongTableComponentList.forEach(instance => {
        instance.loadPlaylistSongs(expandedElement._id);
      });
    }
  }

  findSongs() {
    if (this.input.nativeElement.value !== '') {
      this.dataSource.findUserPlaylists(
        1,
        this.input.nativeElement.value,
        '',
        0,
        0);
    } else {
      this.dataSource.findUserPlaylists(
        1,
        this.input.nativeElement.value,
        '',
        0,
        0);
    }
  }

  // applyFilter(filterValue: string) {
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  // }

  openDialog(element) {
    const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose=true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.data = element;
    this.dialog.open(ReviewComponent, dialogConfig);
  }
}
