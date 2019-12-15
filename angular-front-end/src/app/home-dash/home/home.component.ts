import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Subscription, Subject, fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { SongTableComponent } from '../../song-table/song-table.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit,OnDestroy {


  @ViewChild('input', { static: false }) input: ElementRef;
  @ViewChild(SongTableComponent, { static: false }) child: SongTableComponent;

  sub:Subscription;
  search: string;
  constructor(private _auth: AuthService) { }

  ngOnInit() {
    
  }
  ngAfterViewInit() {
       // server-side search
      this.sub= fromEvent(this.input.nativeElement, 'keyup')
       .pipe(
         debounceTime(150),
         distinctUntilChanged(),
         tap(() => {
           this.child.findSongs(this.input.nativeElement.value);
         })
       )
       .subscribe();
  }
  ngOnDestroy(): void {
    if(this.sub)
    {
      this.sub.unsubscribe();
    }
  }


}
