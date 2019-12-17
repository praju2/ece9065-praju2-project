// https://www.youtube.com/watch?v=7L80dKtfHe0&list=PLC3y8-rFHvwg2RBz6UplKTGIXREj9dV0G&index=24
// https://fireship.io/lessons/angularfire-google-oauth/
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';


import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User;

  user$: Observable<User>;


  private _registerUrl = 'http://localhost:8080/api/open/user/signup';
  private _loginUrl = 'http://localhost:8080/api/open/user/authenticate';

  constructor(private http: HttpClient, private _router: Router, private afAuth: AngularFireAuth, private afs: AngularFirestore, private router: Router) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        // Logged in
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          // Logged out
          return of(null);
        }
      })
    );
  }

  registerUser(user) {
    return this.http.post<any>(this._registerUrl, user);
  }

  loginUser(user) {
    return this.http.post<any>(this._loginUrl, user);
  }

  resendVerification(user) {
    console.log(user);
    return this.http.post<any>(this._loginUrl+"/reverify", user);
  }



  logoutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('email');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    localStorage.removeItem('isVerified');

    this._router.navigate(['\login']);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  getUserDetails(detail) {
    if (this.loggedIn()) {
      if (detail === 'user_id') {
        return localStorage.getItem('user_id');
      }
      else if (detail === 'email') {
        return localStorage.getItem('email');
      }
      else if (detail === 'username') {
        return localStorage.getItem('username');
      }
      else if (detail === 'role') {
        return localStorage.getItem('role');
      }
      else if (detail === 'isVerified') {
        return localStorage.getItem('isVerified');
      }
    }

  }

  async googleSignin() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    
    const user={      
      username: credential.user.displayName,
      email: credential.user.email,
      role: 'user',
      isVerified: true,
      password: 'google'
    }
    
    this.http.post<any>(this._loginUrl+"/google", user).subscribe(
      res => {     
        console.log(res);     
        localStorage.setItem('user_id', res.user.user_id);       
        localStorage.setItem('username', res.user.user_id);       
        localStorage.setItem('email', res.user.email);       
        localStorage.setItem('role', res.user.role);       
        localStorage.setItem('isVerified', res.user.isVerified);    
        localStorage.setItem('token', res.token);          
        this._router.navigate(['/home']);
      },
      err => {console.log('error', err.error)
      }
    );   
 
  }


  async signOut() {
    await this.afAuth.auth.signOut();
    this.router.navigate(['/']);
  }
}
