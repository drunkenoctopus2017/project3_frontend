import { Injectable } from '@angular/core';

import { zuulUrl } from './zuul-url';
import { Http } from '@angular/http';


@Injectable()
export class TaskService {

  constructor(private http: Http) { }

  deleteTasksByStoryId(storyId: number) {
    const url = zuulUrl+"octo-task-service/deleteTasksByStoryId/" + storyId;
    return this.http.get(url).toPromise().then().catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred in task service: ', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
