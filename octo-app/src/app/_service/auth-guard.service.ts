import { Injectable } from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {CookieService} from 'angular2-cookie';
import { SystemUser } from '../_model/SystemUser';

@Injectable()
export class AuthGuard {

  constructor(private router: Router, private cookieService: CookieService) { }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    //Basically checks if you got through OAuth2 or not.
    console.log("route.url: " + route.url);

    const currentUser: SystemUser = this.cookieService.getObject('user');
    const token = localStorage.getItem('token');
    /*
    const path:string = route.url.toString();
    switch (path) {
      case "mainMenu": return currentUser != null;
      default: console.log("default guard pass for " + path);
    }
    */
    return (currentUser != null && token != null);
  }
}
