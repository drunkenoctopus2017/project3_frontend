import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { SystemUser } from '../_model/SystemUser';

import { environment } from '../../environments/environment';

@Injectable()
export class AssignMembersService {

  private zuulUrl: string = "http://"+environment.hostIp+":8765/";
  constructor(private http: Http) { }

  getAllUsers() {
    let url = this.zuulUrl+"octo-user-management-service/addUsers";//+"?access_token="+localStorage.getItem('token');
    let headers: Headers = new Headers({ 
      "Content-Type": "application/json",
      'Authorization': 'Bearer ' + localStorage.getItem('token') 
    });
    let options: RequestOptions = new RequestOptions({ headers: headers });
    return this.http.get(url, options).toPromise().then(res => res.json() as SystemUser[]).catch(this.handleError);
  }

  getUsersOnBoard(boardId: number) {
    let url = this.zuulUrl+"octo-user-management-service/getUsersOnBoard/"+boardId;//+"?access_token="+localStorage.getItem('token');
    let headers: Headers = new Headers({ 
      "Content-Type": "application/json",
      'Authorization': 'Bearer ' + localStorage.getItem('token') 
    });
    let options: RequestOptions = new RequestOptions({ headers: headers });
    return this.http.get(url, options).toPromise().then(res => res.json() as SystemUser[]).catch(this.handleError);
  }

  updateBoardUsers(boardId: number, users: SystemUser[]) {
    let url = this.zuulUrl+"octo-user-management-service/updateBoardUsers/"+boardId;//+"?access_token="+localStorage.getItem('token');
    let body = users;
    let headers: Headers = new Headers({ 
      "Content-Type": "application/json",
      'Authorization': 'Bearer ' + localStorage.getItem('token') 
    });
    let options: RequestOptions = new RequestOptions({ headers: headers });
    return this.http.post(url, body, options).toPromise().then(res => res.json() as SystemUser[]).catch(this.handleError);
  }
  
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
