import { Injectable } from '@angular/core';
import { ScrumBoard } from '../_model/ScrumBoard';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { zuulUrl } from './zuul-url';

@Injectable()
export class BoardService {

  private selectedBoard:ScrumBoard;

  constructor(private http: Http) { }
  
  getSelectedBoard():ScrumBoard {
    return this.selectedBoard;
  }

  setSelectedBoard(board:ScrumBoard) {
    if (board != this.selectedBoard) {
      this.selectedBoard = board;
    }
  }

  //Should this be moved to a separate service for the sake of differentiation? Would that make it clearer?
  //For now keep it here since this service is the only one calling this method/endpoint.
  private getBoardIdsByUserId(userId: number): Promise<number[]> {
    //Yes, this does indeed go to a different micro-service.
    const url = zuulUrl+"octo-user-management-service/getScrumBoardIdsByUserId/" + userId;
    return this.http.get(url)
      .toPromise()
      //.then(function(response) {
      //  console.log("boardIds: " + response);
      //  //var ids:number[] = response.json() as number[]; <- this also works.
      //  var ids:number[] = response.json() || [];
      //  console.log("post json parse: " + ids);
      //  return ids;
      //})
      .then(response => response.json() || [])
      .catch(this.handleError);
  }

  private getBoardsByIds(boardIds: number[]): Promise<ScrumBoard[]> {
    const url = zuulUrl+"octo-board-management-service/getBoardsByIds/";
    return this.http.post(url, boardIds)
      .toPromise()
      //.then(function(response) {//use this anonymous function if debugging is required})
      .then(response => response.json() as ScrumBoard[])
      .catch(this.handleError);
  }
  
  getBoardsByUserId(userId: number): Promise<ScrumBoard[]> {
    //I'm extremely pleased this works.
    return this.getBoardIdsByUserId(userId).then(ids => this.getBoardsByIds(ids));
  }

  getBoardById(id: number): Promise<ScrumBoard> {
    const url = zuulUrl+"octo-board-management-service/getBoardById/" + id;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as ScrumBoard)
      .catch(this.handleError);
  }

  createUpdateBoard(sb: ScrumBoard): Promise<ScrumBoard> {
    const url = zuulUrl+"octo-board-management-service/createUpdateBoard/";
    return this.http.post(url, sb)
      .toPromise()
      .then(response => response.json() as ScrumBoard)
      .catch(this.handleError);
  }

  deleteBoardById(boardId:number) {
    const url = zuulUrl+"octo-board-management-service/deleteBoardById/" + boardId;
    return this.http.get(url).toPromise().then().catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred in board service: ', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}