import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { SystemUser } from '../_model/SystemUser';

@Injectable()
export class AssignMembersService {

  constructor(private http: Http) { }

  getAllUsers() {
    let url = "/octo-user-management-service/addUsers";
    return this.http.get(url).toPromise().then(res => res.json() as SystemUser[]).catch(this.handleError);
  }

  getUsersOnBoard(boardId: number) {
    let url = "/octo-user-management-service/getUsersOnBoard/";
    return this.http.get(url + boardId).toPromise().then(res => res.json() as SystemUser[]).catch(this.handleError);
  }

  updateBoardUsers(boardId: number, users: SystemUser[]) {
    let url = "/octo-user-management-service/updateBoardUsers/";
    let body = JSON.stringify(users);

    console.log('BODY:');
    console.log(body);

    
    return this.http.post(url + boardId, body).toPromise().then(res => res.json() as SystemUser[]).catch(this.handleError);
  }
  
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
