import { Injectable } from '@angular/core';
import { Task } from '../_model/Task';

@Injectable()
export class TaskService {

  constructor() {
     
   }
   getTaskById(storyId: number){
   }


  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}