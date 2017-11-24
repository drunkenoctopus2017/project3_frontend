import { Injectable } from '@angular/core';
import { ScrumBoard } from '../_model/ScrumBoard';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BoardService {

  constructor(private http: Http) { }
  /*
  //getBoardsByUserID(userID: number): ScrumBoard[] { //eventually should be a promise: Promise<ScrumBoard[]>
  //  return this.dummyData;
  //}
/*
  
/*
  getBoardsByUserId(userId: number): Promise<ScrumBoard> {
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
*/


  //Should this be moved to a separate service for the sake of differentiation? Would that make it clearer?
  //For now keep it here since this service is the only one calling this method/endpoint.
  //searchResult: any[];
  
  //...
  //this.searchResult = profileResponse.json() || {}
  getBoardIdsByUserId(userId: number): Promise<number[]> {
    //Yes, this does indeed go to a different micro-service.
    const url = "octo-user-management-service/getScrumBoardIdsByUserId/" + userId;
    return this.http.get(url)
      .toPromise()
      //.then(function(response) {
      //  console.log("boardIds: " + response);
      //  //var ids:number[] = response.json() as number[]; <- this also works.
      //  var ids:number[] = response.json() || [];
      //  console.log("post json parse: " + ids);
      //  return ids;
      //})
      .then(response => response.json() || []).catch(this.handleError);
  }

  getBoardsByIds(boardIds: number[]): Promise<ScrumBoard[]> {
    const url = "octo-board-management-service/getBoardsByIds/";
    return this.http.post(url, boardIds)
      .toPromise()
      //.then(function(response) {//use this anonymous function if debugging is required})
      .then(response => response.json() as ScrumBoard[]).catch(this.handleError);
  }
  
  getBoardsByUserId(userId: number): Promise<ScrumBoard[]> {
    //I'm extremely pleased this works.
    return this.getBoardIdsByUserId(userId).then(ids => this.getBoardsByIds(ids));
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
