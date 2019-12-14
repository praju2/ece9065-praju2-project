import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { SongTableComponent } from './song-table/song-table.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule, MatProgressSpinnerModule } from '@angular/material';
import { MatDialogModule } from '@angular/material/dialog';
import { ReviewComponent } from './review/review.component';
import { OpenService } from './services/open.service';
import { SongService } from './services/song.service';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { SpeicalEventsComponent } from './speical-events/speical-events.component';
import { PlaylistTableComponent } from './playlist-table/playlist-table.component';
import { AuthGuard } from './guard/auth.guard';
import { TokenInterceptorService } from './services/token-interceptor.service';

// 1. Import the libs you need
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

// 2. Add your credentials from step 1
const firebaseConfig = {
  apiKey: 'AIzaSyDFVqSr0GKfAlWBwQSGqwg_aHznvgw8PPM',
  authDomain: 'ece9065-praju2-project.firebaseapp.com',
  databaseURL: 'https://ece9065-praju2-project.firebaseio.com',
  projectId: 'ece9065-praju2-project',
  storageBucket: 'ece9065-praju2-project.appspot.com',
  messagingSenderId: '280272953239',
  appId: '1:280272953239:web:fb67b74c96bca491a56ed2',
  measurementId: 'G-NEM29GPYST'
};

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
    MatProgressSpinnerModule,
    // 3. Initialize
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule // auth

  ],
  providers: [OpenService, AuthGuard, SongService, { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true }],
  bootstrap: [AppComponent],
  entryComponents: [ReviewComponent]
})
export class AppModule { }
