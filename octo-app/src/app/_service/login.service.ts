import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { Base64 } from 'js-base64';
import { SystemUser } from '../_model/SystemUser';
import 'rxjs/add/operator/map';

@Injectable()
export class LoginService {
  //--proxy-config proxy.conf.json",
  // zuulUrl: string = "";//"http://localhost:8765";
  zuulUrl: string = "http://localhost:8765/";
  // we don't need a proxy in order to send requests to the Zuul URL, 
  // we can just have the url ^here and send a request using the full Url and it should work
  // therefore, we can use the proxy server for something else *hint hint* (spring boot - angular app combination)
  constructor(private http: Http, private router: Router) { }
  
  updatedUser: string;
  
  //login
  authenticate(username, password) {
    const url = "http://localhost:8090/auth/oauth/token";
    const headers:Headers = new Headers({
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": "Basic " + Base64.encode(username + ':' + password)
    });
    const options:RequestOptions = new RequestOptions({headers: headers});
    const credentials:string = 'grant_type=client_credentials';
    // this.creds = 'grant_type=authorization_code';
    this.http.post(url, credentials, options)
      .map(res => res.json())
      //this is an Observable
      //optionally use Promise with toPromise()
      .subscribe(response => {
        localStorage.setItem('token', response.access_token);
        //before this you'd get the user data/roletype from the DB
        this.router.navigateByUrl("/home");
      }, (error) => {
        console.log('error in', error);
      });
  }


  login(username: string, password: string) {
    //http://localhost:8765/ <-- set by proxy server setting
    
    let url = this.zuulUrl+"octo-user-management-service/login/";
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
