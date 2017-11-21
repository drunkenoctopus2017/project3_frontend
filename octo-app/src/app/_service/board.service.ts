import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import {SystemBoard} from '../_model/SystemBoard';

@Injectable()
export class BoardService {

  //reserved for simple initialization like wiring constructor params to properties
  constructor(private boardService: BoardService, private http:Http) { }

  //methods here 
  createUpdateBoard(){
    let url = "";
    let body = {}
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
