import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import {SystemBoard} from '../_model/SystemBoard';

@Injectable()
export class BoardService {

  //reserved for simple initialization like wiring constructor params to properties
  constructor(private http:Http) { }

  //methods here 
  createUpdateBoard(){
    let url = "";
    let body = {}
  }

  getBoardsByUserID(userID: number): SystemBoard[] { //eventually should be a promise: Promise<SystemBoard[]>
    return this.dummyData;
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
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
