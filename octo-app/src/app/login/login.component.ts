import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {LoginService} from '../_service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'], 
  providers : [LoginService] 
})

export class LoginComponent implements OnInit {

  constructor(private loginService:LoginService, private router:Router) { }

  ngOnInit() {
  }

  login(username:string, password:string) {
    let user = this.loginService.login(username, password);
    if(user != null){
      this.router.navigate(['/mainMenu']);
    }
  }
}
