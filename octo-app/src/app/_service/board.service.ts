import { Injectable } from '@angular/core';
import { ScrumBoard } from '../_model/ScrumBoard';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BoardService {

  constructor(private http: Http) { }
  
  getBoardsByUserID(userID: number): ScrumBoard[] { //eventually should be a promise: Promise<ScrumBoard[]>
    return this.dummyData;
  }

  getBoardById(id: number): Promise<ScrumBoard> {
    const url = "octo-board-management-service/getBoardById/" + id;
    return this.http.get(url)
      .toPromise()
      //.then(response => response.json() as ScrumBoard)
      .then(function(response) {
        var board:ScrumBoard = response.json() as ScrumBoard;
        console.log("board: " + board);
        return board;
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
  /*
  getBoardById2(id: number): Observable<ScrumBoard> {
    let url = "octo-board-management-service/getBoardById/" + id;
    return this.http.get(url);
      //.map((response: Response) => <ScrumBoard>response.json())
      //.toPromise()
      //.catch(this.handlePromiseError);
  }
  */
  handlePromiseError(error: Response) {
    console.error(error);
    throw error;
  }
  dummyData: ScrumBoard[] = [{
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
}
