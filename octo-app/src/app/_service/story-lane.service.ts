import { Injectable } from '@angular/core';
import { StoryLane } from '../_model/StoryLane';
import { Http, Response } from '@angular/http';

@Injectable()
export class StoryLaneService {
  
  constructor(private http: Http) { }
  
  getStoryLanes(): Promise<StoryLane[]> {
    const url = "octo-story-service/getStoryLanes";
    return this.http.get(url).toPromise().then(response => response.json() as StoryLane[]).catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('StoryLaneService error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
