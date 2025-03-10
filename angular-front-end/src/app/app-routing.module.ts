import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home-dash/home/home.component';

import { HomeDashComponent } from './home-dash/home-dash.component';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register/register.component';
import { PlaylistTableComponent } from './playlist-table/playlist-table.component';
import { AuthGuard } from './guard/auth.guard';
import { LoginGuard } from './guard/login.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeDashComponent },
  { path: 'playlist', component: PlaylistTableComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [LoginGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
