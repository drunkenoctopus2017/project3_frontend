import { Injectable } from '@angular/core';
import { ScrumBoard } from '../_model/ScrumBoard';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { environment } from '../../environments/environment';


@Injectable()
export class BoardService {

  private zuulUrl: string = "http://"+environment.hostIp+":8765/";
  private selectedBoard:ScrumBoard;

  constructor(private http: Http) { }
  
  getSelectedBoard():ScrumBoard {
    return this.selectedBoard;
  }

  setSelectedBoard(board:ScrumBoard) {
      this.selectedBoard = board;
  }

  //Should this be moved to a separate service for the sake of differentiation? Would that make it clearer?
  //For now keep it here since this service is the only one calling this method/endpoint.
  private getBoardIdsByUserId(userId: number): Promise<number[]> {
    //Yes, this does indeed go to a different micro-service.
    const url = this.zuulUrl+"octo-user-management-service/getScrumBoardIdsByUserId/"+userId;//+"?access_token="+localStorage.getItem('token');
    let headers: Headers = new Headers({ 
      "Content-Type": "application/json",
      'Authorization': 'Bearer ' + localStorage.getItem('token') 
    });
    let options: RequestOptions = new RequestOptions({ headers: headers });
    return this.http.get(url, options)
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
    const url = this.zuulUrl+"octo-board-management-service/getBoardsByIds/";//+"?access_token="+localStorage.getItem('token');
    let headers: Headers = new Headers({ 
      "Content-Type": "application/json",
      'Authorization': 'Bearer ' + localStorage.getItem('token') 
    });
    let options: RequestOptions = new RequestOptions({ headers: headers });
    return this.http.post(url, boardIds, options)
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
    const url = this.zuulUrl+"octo-board-management-service/getBoardById/"+id;//+"?access_token="+localStorage.getItem('token');
    let headers: Headers = new Headers({ 
      "Content-Type": "application/json",
      'Authorization': 'Bearer ' + localStorage.getItem('token') 
    });
    let options: RequestOptions = new RequestOptions({ headers: headers });
    return this.http.get(url, options)
      .toPromise()
      .then(response => response.json() as ScrumBoard)
      .catch(this.handleError);
  }

  createUpdateBoard(sb: ScrumBoard): Promise<ScrumBoard> {
    const url = this.zuulUrl+"octo-board-management-service/createUpdateBoard/";//+"?access_token="+localStorage.getItem('token');
    let headers: Headers = new Headers({ 
      "Content-Type": "application/json",
      'Authorization': 'Bearer ' + localStorage.getItem('token') 
    });
    let options: RequestOptions = new RequestOptions({ headers: headers });
    return this.http.post(url, sb, options)
      .toPromise()
      .then(response => response.json() as ScrumBoard)
      .catch(this.handleError);
  }

  deleteBoardById(boardId:number) {
    const url = this.zuulUrl+"octo-board-management-service/deleteBoardById/"+boardId;//+"?access_token="+localStorage.getItem('token');
    let headers: Headers = new Headers({ 
      "Content-Type": "application/json",
      'Authorization': 'Bearer ' + localStorage.getItem('token') 
    });
    let options: RequestOptions = new RequestOptions({ headers: headers });
    return this.http.get(url, options).toPromise().then().catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred in board service: ', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}