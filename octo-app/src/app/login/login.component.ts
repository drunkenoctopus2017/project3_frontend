import { Component, OnInit } from '@angular/core';
import {LoginService} from '../_service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'], 
  providers : [LoginService] 
})

export class LoginComponent implements OnInit {

  constructor(private loginService:LoginService) { }

  ngOnInit() {
  }

  login(username:string, password:string) {
    this.loginService.login(username, password);
  }
}
