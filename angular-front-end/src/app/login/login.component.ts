import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userData: User = { user_id:'',username: '', email: '', role: '', isVerified:false };
  constructor(private _auth: AuthService, private _router: Router) { }

  ngOnInit() {
  }

  loginUser() {
    this._auth.loginUser(this.userData)
      .subscribe(
        res => {          
          localStorage.setItem('user_id', res.user.user_id);       
          localStorage.setItem('username', res.user.user_id);       
          localStorage.setItem('email', res.user.email);       
          localStorage.setItem('role', res.user.role);       
          localStorage.setItem('isVerified', res.user.isVerified);    
          localStorage.setItem('token', res.token);          
          this._router.navigate(['/home']);
        },
        err => console.log('error', err.error)
      );

  }
}
