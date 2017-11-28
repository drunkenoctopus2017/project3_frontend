import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { SystemUser } from '../_model/SystemUser';

import { zuulUrl } from './zuul-url';

@Injectable()
export class UserService {

  constructor(private http: Http) { }

  getBoardMembersByBoardId(boardId: number): Promise<SystemUser[]> {
    const url = zuulUrl+"octo-user-management-service/getBoardMembersByBoardId/" + boardId;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as SystemUser[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
