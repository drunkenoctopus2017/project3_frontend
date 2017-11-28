import { Injectable } from '@angular/core';
import { StoryLane } from '../_model/StoryLane';
import { Http, Response } from '@angular/http';

import { zuulUrl } from './zuul-url';

@Injectable()
export class StoryLaneService {

  private storyLanesCache:StoryLane[];

  constructor(private http: Http) { }
  
  getCachedStoryLanes():StoryLane[] {
    return this.storyLanesCache;
  }

  getStoryLanes(): Promise<StoryLane[]> {
    const url = zuulUrl+"octo-story-service/getStoryLanes";
    return this.http.get(url).toPromise().then(response => response.json() as StoryLane[]).then(lanes => this.storyLanesCache = lanes).catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('StoryLaneService error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
