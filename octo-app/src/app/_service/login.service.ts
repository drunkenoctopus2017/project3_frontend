import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { SystemUser } from '../_model/SystemUser';

@Injectable()
export class LoginService {

  constructor(private http: Http) { }
  login(username: string, password: string) {
    //http://localhost:8765/ <-- set by proxy server setting
    let url = "octo-user-management-service/login";
    let body = {username: username, password: password};
    return this.http.post(url, body).toPromise().then(response => response.json() as SystemUser).catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
