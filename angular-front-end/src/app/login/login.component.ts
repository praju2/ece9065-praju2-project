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

  userData: User = { username: '', email: '', password: '' };
  constructor(private _auth: AuthService, private _router: Router) { }

  ngOnInit() {
  }

  loginUser() {
    this._auth.loginUser(this.userData)
      .subscribe(
        res => {
          localStorage.setItem('token', res.token);
          this._router.navigate(['/home']);
        },
        err => console.log('error', err.error)
      );

  }
}
