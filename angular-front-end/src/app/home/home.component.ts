import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Subscription, Subject, fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { SongTableComponent } from '../song-table/song-table.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('input', { static: false }) input: ElementRef;
  @ViewChild(SongTableComponent, { static: false }) child: SongTableComponent;

  constructor() { }

  ngOnInit() {

  }
  ngAfterViewInit() {
    // server-side search
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.child.findSongs(this.input.nativeElement.value);
        })
      )
      .subscribe();
  }


}
