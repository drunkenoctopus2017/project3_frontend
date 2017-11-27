import { Injectable } from '@angular/core';
import { SystemBoard } from '../_model/SystemBoard';
import { Http } from '@angular/http';
  

@Injectable()
export class BoardService {

  zuulUrl: string = "http://localhost:8765/";

  constructor(private http: Http) { }

  public selectedBoard: SystemBoard = {
    id: 5,
    name: "KJASKDJA",
    startDate: new Date(),
    duration: 20
}

  getBoardByBoardID(boardID: number): SystemBoard{
    return {
      id: 1,
      name: "Uno Board",
      startDate: new Date(),
      duration: 14
    };
  } 

  getBoardsByUserID(userID: number): SystemBoard[] { //eventually should be a promise: Promise<SystemBoard[]>
    return this.dummyData;
    // send GET request to this URL /getBoardsForUser/{userId}
  }

  createBoard(name: string, startDate: string, duration: number) {
    let url = this.zuulUrl+"octo-board-service/login";
    let body = {name: name, startDate: startDate, duration: duration};
    return this.http.post(url, body, ).toPromise().then(response => response.json() as SystemBoard).catch(this.handleError);
  }

  editBoard(boardID: number, name: string, startDate: string, duration: number) {
    let url = this.zuulUrl+"octo-board-service/login";
    let body = {id: boardID, name: name, startDate: startDate, duration: duration};
    return this.http.post(url, body, ).toPromise().then(response => response.json() as SystemBoard).catch(this.handleError);
  }

  dummyData: SystemBoard[] = [{
    id: 1,
    name: "Uno Board",
    startDate: new Date(),
    duration: 14
  },
  {
    id: 2,
    name: "Board Number 2",
    startDate: new Date(),
    duration: 15
  }];

  private handleError(error: any): Promise<any> {
    console.error('An error occurred in BoardService', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
