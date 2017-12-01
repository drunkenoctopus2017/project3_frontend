import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { Base64 } from 'js-base64';
import { SystemUser } from '../_model/SystemUser';
import {CookieService} from 'angular2-cookie';
import 'rxjs/add/operator/map';

import { zuulUrl } from './zuul-url';

@Injectable()
export class LoginService {
  //--proxy-config proxy.conf.json",

  // we don't need a proxy in order to send requests to the Zuul URL, 
  // we can just have the url ^here and send a request using the full Url and it should work
  // therefore, we can use the proxy server for something else *hint hint* (spring boot - angular app combination)
  constructor(private http: Http, 
              private router: Router,
              private cookieService: CookieService) { }
  
  updatedUser: string;
  
  //login
  authenticate(username, password):Promise<SystemUser> {
    const url = zuulUrl+"octo-auth/auth/oauth/token";
    const headers:Headers = new Headers({
      "Content-Type": "application/x-www-form-urlencoded",
      //"Authorization": "Basic " + Base64.encode(username + ':' + password)
      "Authorization": "Basic " + Base64.encode('drunkenOctopus:secret')
    });
    const options:RequestOptions = new RequestOptions({headers: headers});
    const requestBody:string = 'grant_type=password&username=' + username + '&password=' + password;
    // this.creds = 'grant_type=authorization_code';
    return this.http.post(url, requestBody, options)
      .map(res => res.json()).toPromise()
      .then(response => {
        localStorage.setItem('token', response.access_token);
      }).then(response =>
        this.login(username, password)
      )
      .catch(this.handleError);
  }

  login(username: string, password: string):Promise<SystemUser> {
    //http://localhost:8765/ <-- set by proxy server setting
    let url = zuulUrl+"octo-user-management-service/login/"+"?access_token="+localStorage.getItem('token');
    let body = {username: username, password: password};
    let headers: Headers = new Headers({ 
      "Content-Type": "application/json"
      // 'Authorization': 'Bearer ' + localStorage.getItem('token') 
    });
    let options: RequestOptions = new RequestOptions({ headers: headers });
    return this.http.post(url, body, options).toPromise().then(response => response.json() as SystemUser).catch(this.handleError);
  }

  logout(){
    localStorage.clear();
    this.cookieService.removeAll();
    this.router.navigate(['/login']);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
