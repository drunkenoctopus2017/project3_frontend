import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {LoginService} from '../_service/login.service';
import { CookieService } from 'ngx-cookie-service';
import { SystemUser } from '../_model/SystemUser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'], 
  providers : [LoginService]
})

export class LoginComponent implements OnInit {

  cookieValue= 'UNKNOWN';

  constructor(private loginService:LoginService, private cookieService: CookieService, private router:Router) { }

  ngOnInit() {
  }

  login(username:string, password:string) {
    var sysUser = null;
    this.loginService.login(username, password).then(user => sysUser = user);

    if(sysUser != null){
      
      console.log('user is: ' + sysUser);
      this.router.navigate(['/mainMenu']);
    }
  }
}
