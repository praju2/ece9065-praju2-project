import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  userData: User = { username: '', email: '', password: '' };
  constructor(private _auth: AuthService) { }

  ngOnInit() {
  }

  registerUser() {
    this._auth.registerUser(this.userData)
      .subscribe(
        res => console.log('hey', res),
        err => console.log('error', err.error)
      );

  }

}
