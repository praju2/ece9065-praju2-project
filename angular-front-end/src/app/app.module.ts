import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import { SongTableComponent } from './song-table/song-table.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort'
import { MatInputModule,MatProgressSpinnerModule } from '@angular/material'
import {MatDialogModule} from '@angular/material/dialog';
import { ReviewComponent } from './review/review.component';
import { OpenService } from './services/open.service';
import { SongService } from './services/song.service';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { SpeicalEventsComponent } from './speical-events/speical-events.component';
import { PlaylistTableComponent } from './playlist-table/playlist-table.component';
import { AuthGuard } from './auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SongTableComponent,
    ReviewComponent,
    RegisterComponent,
    LoginComponent,
    SpeicalEventsComponent,
    PlaylistTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatDialogModule,
    MatProgressSpinnerModule
  ],
  providers: [OpenService,AuthGuard,SongService],
  bootstrap: [AppComponent],
  entryComponents:[ReviewComponent]
})
export class AppModule { }
