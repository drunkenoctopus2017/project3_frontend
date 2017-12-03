import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Story } from '../_model/Story';
import 'rxjs/add/operator/toPromise';

import { zuulUrl } from './zuul-url';

@Injectable()
export class StoryService {

  private currentMode: string;
  private selectedStory: Story;

  constructor(private http: Http) { }

  getMode(): string {
    return this.currentMode;
  }

  setMode(mode: string) {
    if (mode != this.currentMode) {
      this.currentMode = mode;
    }
  }

  getSelectedStory(): Story {
    return this.selectedStory;
  }

  setSelectedStory(story: Story) {
    if (story != this.selectedStory) {
      this.selectedStory = story;
    }
  }

  getStoriesByBoardId(boardId: number): Promise<Story[]> {
    const url = zuulUrl + "octo-story-service/getStoriesByBoardId/" + boardId + "?access_token=" + localStorage.getItem('token');
    return this.http.get(url).toPromise().then(response => response.json() as Story[]).catch(this.handleError);
  }

  updateStory(story: Story): Promise<Story> {
    const url = zuulUrl + "octo-story-service/updateStory/" + "?access_token=" + localStorage.getItem('token');
    return this.http.post(url, story).toPromise().then(response => response.json() as Story).catch(this.handleError);
  }

  /*
  //Rabbit MQ messaging disabled. It simply doesn't work for what we need right now.
  updateStory(story:Story):Promise<any> {
    const url = zuulUrl+"octo-story-update-manager/updateStory/";
    return this.http.post(url, story).toPromise().catch(this.handleError);
  }
  */

  deleteStoriesByBoardId(boardId: number) {
    const url = zuulUrl + "octo-story-service/deleteStoriesByBoardId/" + boardId + "?access_token=" + localStorage.getItem('token');
    return this.http.get(url).toPromise().then().catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred in story service: ', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
