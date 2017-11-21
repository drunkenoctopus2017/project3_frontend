import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import {SystemBoard} from '../_model/SystemBoard';

@Injectable()
export class BoardService {

  constructor(private http:Http) { }

  createOrEditBoard(board:SystemBoard){
    let url = "";
    return this.http.post(url, board).toPromise().then(
      response => response.json() as SystemBoard
    )
  }

}
