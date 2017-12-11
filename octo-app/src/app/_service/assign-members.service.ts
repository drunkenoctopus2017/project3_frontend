import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { SystemUser } from '../_model/SystemUser';

import { zuulUrl } from './zuul-url';

@Injectable()
export class AssignMembersService {

  constructor(private http: Http) { }

  getAllUsers() {
    let url = zuulUrl+"octo-user-management-service/addUsers"+"?access_token="+localStorage.getItem('token');
    return this.http.get(url).toPromise().then(res => res.json() as SystemUser[]).catch(this.handleError);
  }

  getUsersOnBoard(boardId: number) {
    let url = zuulUrl+"octo-user-management-service/getUsersOnBoard/"+boardId+"?access_token="+localStorage.getItem('token');
    return this.http.get(url).toPromise().then(res => res.json() as SystemUser[]).catch(this.handleError);
  }

  updateBoardUsers(boardId: number, users: SystemUser[]) {
    let url = zuulUrl+"octo-user-management-service/updateBoardUsers/"+boardId+"?access_token="+localStorage.getItem('token');
    let body = users;

    return this.http.post(url, body).toPromise().then(res => res.json() as SystemUser[]).catch(this.handleError);
  }
  
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
