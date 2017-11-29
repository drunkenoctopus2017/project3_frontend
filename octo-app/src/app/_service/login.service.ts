import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { SystemUser } from '../_model/SystemUser';

import { zuulUrl } from './zuul-url';

@Injectable()
export class LoginService {
  //--proxy-config proxy.conf.json",

  // we don't need a proxy in order to send requests to the Zuul URL, 
  // we can just have the url ^here and send a request using the full Url and it should work
  // therefore, we can use the proxy server for something else *hint hint* (spring boot - angular app combination)
  constructor(private http: Http) { }
  login(username: string, password: string) {
    //http://localhost:8765/ <-- set by proxy server setting
    
    let url = zuulUrl+"octo-user-management-service/login/";
    let body = {username: username, password: password};
    return this.http.post(url, body, ).toPromise().then(response => response.json() as SystemUser).catch(this.handleError);
  }
  isLoggedIn(user: any): boolean{
    if(user != null){
      return true;
    }else{
      return false;
    }

    
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
