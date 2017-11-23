import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import{SystemStory} from '../_model/SystemStory';
@Injectable()
export class StoryServiceService {
//create dummy data for tasks. make story link to tasks. make create tasks. and make them take dummy data as well
  constructor(private http:Http) { }

  getStoryById(boardId: number){
    return this.dummyData;
  }

  dummyData: SystemStory[] =[{
    id: 1,
    description: "this and that",
    points: 5,
    finishTime: new Date()
  },
  {
    id: 2,
    description: "this, that, the third",
    points: 5,
    finishTime: new Date()
  }];

  
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
