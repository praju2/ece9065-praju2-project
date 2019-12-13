//https://www.youtube.com/watch?v=7L80dKtfHe0&list=PLC3y8-rFHvwg2RBz6UplKTGIXREj9dV0G&index=24
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
  private _registerUrl = "http://localhost:8080/api/open/user/signup";
  private _loginUrl = "http://localhost:8080/api/open/user/authenticate";

  constructor(private http: HttpClient,
    private _router: Router) { }

    registerUser(user) {
      return this.http.post<any>(this._registerUrl, user)  
    } 
    
    loginUser(user) {  
      return this.http.post<any>(this._loginUrl, user)  
    }
  
    logoutUser() {  
      localStorage.removeItem('token')  
      this._router.navigate(['/events'])  
    } 
  
    getToken() {  
      return localStorage.getItem('token')  
    }
    
    loggedIn() {
        return !!localStorage.getItem('token')      
    }    
}
