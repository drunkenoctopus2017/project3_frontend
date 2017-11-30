import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {CookieService} from 'angular2-cookie';

import { LoginService } from '../_service/login.service';
import { SystemUser } from '../_model/SystemUser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})

export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router, private cookieService: CookieService) {}

  ngOnInit() {}

  noAuthLogin(username: string, password: string) {
    this.loginService.login(username, password).then(user => {
      this.cookieService.putObject('user', user);
      this.router.navigate(['/mainMenu']);
    });
  }
  /*
  login(username: string, password: string) {
    var c = this.cookieService;
    var r = this.router;
    
    //this.loginService.login(username, password).then(function(user) {
    //  console.log(user);
    //  c.putObject('user', user);
    //  r.navigate(['/mainMenu']);
    //});
    
    this.loginService.authenticate(username, password).then(user => {
      this.cookieService.putObject('user', user);
      this.router.navigate(['/mainMenu']);
    });
  }
  */
}
