import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Subscription, Subject, fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { SongTableComponent } from '../../song-table/song-table.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  @ViewChild(SongTableComponent, { static: false }) child: SongTableComponent;

  search: string;
  constructor(private _auth: AuthService) { }

  ngOnInit() {
    
  }
  ngAfterViewInit() {
   
  }


}
