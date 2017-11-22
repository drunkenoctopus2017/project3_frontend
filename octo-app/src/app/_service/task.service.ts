import { Injectable } from '@angular/core';
import { SystemTask } from '../_model/SystemTask';

@Injectable()
export class TaskService {

  constructor() { }

  dummyData: SystemTask[] = [{
    id: 1,
    status: 2,
    description: "this"
  }, 
  {
    id: 2,
    status: 3,
    description: "that"
  }
  ];

  
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}