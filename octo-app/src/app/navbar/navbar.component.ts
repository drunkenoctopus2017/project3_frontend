import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {CookieService} from 'angular2-cookie';
import { LoginService } from '../_service/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private loginService: LoginService
  ) { }

  ngOnInit() {
  }

  goHome(){
    this.router.navigate(['/mainMenu']);
  }

  logout(){
    localStorage.clear();
    this.cookieService.removeAll();
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean{
    return this.loginService.isLoggedIn();
  }
}
