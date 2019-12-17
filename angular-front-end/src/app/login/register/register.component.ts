import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  userData: User = { username: '', email: '', isVerified:false,role:'',user_id:'' ,password:''};
  constructor(private _auth: AuthService,private _notification:NotificationService) { }

  ngOnInit() {
  }

  registerUser() {
    this._auth.registerUser(this.userData)
      .subscribe(
        res => console.log('hey', res),
        err => {console.log('error', err.error)
        if(err.error){
          this._notification.warn(err.error.msg);
        }
        }
      );

  }

}
