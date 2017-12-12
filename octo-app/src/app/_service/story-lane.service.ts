import { Injectable } from '@angular/core';
import { StoryLane } from '../_model/StoryLane';
import { Http, Response } from '@angular/http';

import { environment } from '../../environments/environment';

@Injectable()
export class StoryLaneService {

  private zuulUrl: string = "http://"+environment.hostIp+":8765/";
  private storyLanesCache:StoryLane[];

  constructor(private http: Http) { }
  
  getCachedStoryLanes():StoryLane[] {
    return this.storyLanesCache;
  }

  getStoryLanes(): Promise<StoryLane[]> {
    const url = this.zuulUrl+"octo-story-service/getStoryLanes"+"?access_token="+localStorage.getItem('token');
    return this.http.get(url).toPromise().then(response => response.json() as StoryLane[]).then(lanes => this.storyLanesCache = lanes).catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('StoryLaneService error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
