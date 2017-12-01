import { Component } from '@angular/core';
import { CookieService } from 'angular2-cookie';
import { LoginService } from './_service/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private cookieService: CookieService,
              private loginService: LoginService){}
  title = 'app';

  logout(){
    this.loginService.logout();
  }
}
