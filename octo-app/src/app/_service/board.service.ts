import { Injectable } from '@angular/core';
import { SystemBoard } from '../_model/SystemBoard';
  

@Injectable()
export class BoardService {

  constructor() { }

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
}
